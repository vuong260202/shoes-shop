var express = require('express');
var router = express.Router();

const CONFIG = require('../config');
const valid = require('../utils/valid/productValidUtils');
const { object } = require('joi');
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
router.post('/filter-product', valid.FilterProduct, (req, res) => {
    let {sort, filters} = req.body
    let page = (req.body.page ? req.body.page : 1)
    let pageSize = (req.body.pageSize ? req.body.pageSize : 10)

    let products, total
    try {
        let conditionFilters = {
            status: 'unsold'
        }

        if (filters) {
            for (let filter in filters) {
                let [key, value] = Object.entries(filter)
                conditionFilters[key] = value
            }
        }

        let conditions = {
            where: conditionFilters,
            offset: (page - 1) * (pageSize || 10),
            limit: pageSize
        }

        if (sort) {
            conditions.order = [Object.entries(sort)]
        }

        products = global.SequelizeModels.Product.findAndCountAll(conditions)
        total = products.count
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

router.post('/upload-product', (req, res) => {
    let Product = global.SequelizeModels.Product

    try {
        let newProduct = new Product()
        newProduct.productName = req.body.productName
        newProduct.price = req.body.price
        newProduct.category = req.body.category

        newProduct.save()
    } catch (err) {
        console.log('error: ', err);
        return res.status(500).json({
            status: 500,
            message: 'Server internal error.'
        })
    }
})

router.post('/update-status', function(req, res) {
    try {
        let product = global.SequelizeModels.Product.findOne({
            where: {
                id: req.body.productId
            }
        })

        if (!product) {
            return res.status(400).json({
                status: 400,
                message: 'Product does not exits.'
            })
        }

        product.status = 'sold'
    } catch (err) {
        console.log('error: ', err);
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

module.exports = router