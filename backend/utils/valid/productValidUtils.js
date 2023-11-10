
let filterProduct = (req, res, next) => {
    const schema = Joi.object({
        sort: Joi.string().required(),
        filters: Joi.string().required(),
        page: Joi.integer().min(1).optional(),
        pageSize: Joi.integer().min(10).max(20).optional(),
    })
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