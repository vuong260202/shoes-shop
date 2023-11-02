var Joi = require('joi');

let login = (req, res, next) => {
    let schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    
    let { error } = schema.validate(req.body)

    if (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: (error.details && error.details[0]) ? error.details[0].message : 'Invalid params'
        })
    }
    next();
}

let signup = (req, res, next) => {
    let schema = Joi.object({
        // fullName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    let { error } = schema.validate(req.body)

    if (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: (error.details && error.details[0]) ? error.details[0].message : 'Invalid params'
        })
    }
    next();
}

let UpdatePassword = (req, res, next) => {
    let schema = Joi.object({
        // fullName: Joi.string().required(),
        newPassword: Joi.string().required(),
        currentPassword: Joi.string().required(),
    })

    let { error } = schema.validate(req.body)

    if (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: (error.details && error.details[0]) ? error.details[0].message : 'Invalid params'
        })
    }
    next();
}

module.exports = {
    Login: login,
    Signup: signup,
    UpdatePassword: UpdatePassword
}