var Joi = require('joi');


let filterProduct = (req, res, next) => {
    const schema = Joi.object({
        // token: Joi.string().required(),
        sort: Joi.string().optional(),
        filters: Joi.object().optional(),
        page: Joi.number().integer().min(1).optional(),
        pageSize: Joi.number().integer().min(10).max(20).optional(),
    });
    let { error } = schema.validate(req.body)
    if (error) {
        console.log(error);
        return res.status(400).json({
        status: 400,
        message: (error.details && error.details[0]) ? error.details[0].message : 'Invalid body'
        })
    }
    
    return next()
}

module.exports = {
    FilterProduct: filterProduct,
}