var express = require('express');
const multer = require('multer');
const path = require('path');

const fs = require('fs').promises;
var router = express.Router();

const CONFIG = require('../config');
const valid = require('../utils/valid/productValidUtils');
const webUtils = require('../utils/webUtils')
const { object } = require('joi');
const { Op } = require('sequelize');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Frontend/shoe-shop/public/img'); // Thư mục lưu trữ file upload
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

/**
 * @api {post} product/filter-product get product list with conditions
 * @apiName filter product
 * @apiGroup product
 *
 * @apiBody {object} sort conditions sort
 * @apiBody {object} filter conditions filter
 * @apiBody {int} page page of site
 * @apiBody {int} pageSize maximum number of products for the site
 *
 * @apiSuccess (200) {object} data total and products list
 * @apiSuccess (200) {int} total number of products
 * @apiSuccess (200) {object} products products list of page
 *
 * @apiError (500) {string} message error message
 * @apiError (400) {string} page does not exist
 */
router.post('/filter-product', webUtils.isLoggedIn, valid.FilterProduct, async (req, res) => {
    let {sort, filters} = req.body
    let page = (req.body.page ? req.body.page : 1)
    let pageSize = (req.body.pageSize ? req.body.pageSize : 10)

    console.log(filters);

    let products, total
    try {
        console.log(req.user.role);
        let Product = global.sequelizeModels.Product

        let conditionFilters = {}

        if (filters) {
            for (let filter in filters) {
                console.log(filter);
                conditionFilters[Op.or] = {
                    [filter]: {
                        [Op.like]: `%${filters[filter]}%`
                    },
                    ['category']: {
                        [Op.like]: `%${filters[filter]}%`
                    },
                }
            }
        }

        console.log(conditionFilters);

        let conditions = {
            where: {
                [Op.and]: conditionFilters,
                total: {
                    [Op.gt]: 0
                }
            },
            offset: (page - 1) * (pageSize || 10),
            limit: pageSize
        }

        if (sort) {
            conditions.order = [Object.entries(sort)]
        }

        console.log(conditions);

        products = await Product.findAndCountAll(conditions)
        total = products.count;
        products = products.rows
    } catch (err) {
        console.log('error: ', err);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }

    return res.status(200).json({
        status: 200,
        data: {
            total: total,
            products: products
        }
    })
})

router.get('/product-details/:id', webUtils.isLoggedIn, async (req, res) => {
    let product
    try {
        let Product = global.sequelizeModels.Product

        product = await Product.findAll({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json({
            status: 200,
            data: {
                userId: req.user.id,
                product: product
            }
        })
    } catch (err) {
        console.log('error: ', err);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }
})

router.post('/upload-product', upload.single('file'), async (req, res) => {
    let Product = global.sequelizeModels.Product
    console.log(req.body);

    try {
        let newProduct = new Product()
        newProduct.productName = req.body.productName
        newProduct.price = req.body.price
        newProduct.size = req.body.size
        newProduct.category = req.body.category
        newProduct.path = req.file.path.substring(req.file.path.indexOf('img'))
        await newProduct.save()

        return res.status(200).json({
            status: 200,
            newProduct
        })
    } catch (err) {
        console.log('error: ', err);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }
})

router.post('/update-status', webUtils.isLoggedIn, webUtils.isAdmin, function(req, res) {
    try {
        let product = global.sequelizeModels.Product.findOne({
            where: {
                id: req.body.productId
            }
        })

        if (!req.body.status.include(['unsold', 'sold'])) {
            return res.status(400).json({
                status: 400,
                message: 'status is sold or unsold'
            })
        }

        if (req.user.role == 'admin') {
            product.status = req.body.status
            return res.status(200).json({
                status: 400,
                message: 'status is sold or unsold'
            })
        }

        if (req.user.role == 'user') {
            product.status = 'pending'
        }

        if (req.user.role == 'admin' && req.body.status == 'sold') {
            product.status = 'sold'
        }

        if (!product) {
            return res.status(400).json({
                status: 400,
                message: 'Product does not exits.'
            })
        }

    } catch (err) {
        console.log('error: ', err);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }
})

router.post('/add-transaction', webUtils.isLoggedIn, async function(req, res) {
    
    try {
        console.log(req.body);

        let Transaction = global.sequelizeModels.Transaction;
        let product = await global.sequelizeModels.Product.findOne({id: req.body.productId});

        let newTransaction = new Transaction()
        newTransaction.userId = req.body.userId
        newTransaction.productId = req.body.productId
        newTransaction.name = req.body.name
        newTransaction.total = req.body.total
        newTransaction.address = req.body.address
        newTransaction.numberPhone = req.body.numberPhone
        newTransaction.status = 'pending'
        newTransaction.createdAt = new Date()
        newTransaction.amount = product.price * req.body.total

        product.total = product.total - req.body.total

        await product.save()
        await newTransaction.save()

        return res.status(200).json({
            status: 200,
            data: {
                newTransaction
            }
        })
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }
})

router.post('/update-product', (req, res) => {
    return res.status(400).json({
        status: 400,
        message: 'Product does not exits.'
    })
})

router.get('/download', async (req, res, next) => {
    if (!fs.existsSync(req.query.path)) {
      return res.status(404).json({
        status: 404,
        message: 'File not found'
      })
    }
    return res.download(req.query.path)
})

module.exports = router