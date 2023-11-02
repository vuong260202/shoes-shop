var express = require('express');
var Joi = require('joi');
var jwt = require('jsonwebtoken')

let router = express.Router();

let WebUtils = require('../utils/webUtils')
let CONFIG = require('../config')
let {valid} = require('../utils/validUtils')

/**
 * @ngdoc method {post} /auth/login login
 * @group auth
 *
 * @RequestBody {String} username
 * @RequestBody {String} password
 */
router.post('/login', valid.authValid.Login, async (req, res) => {
    let User = global.sequelizeModels.User;
    let user;
    try {
        user = await User.findOne({
            where: {
                username: req.body.username,
            }
        })
        console.log(user);
    } catch (e) {
        console.log('error: ', e);
        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        })
    }

    if (!user || user.validPassword(user.hashPassword(req.body.password))) {
        return res.status(400).json({
            status: 400,
            message: 'username or password fail'
        })
    }

    return res.status(200).json({
        status: 200,
        message: 'success',
    })
})

router.post('/signup', valid.authValid.Signup, async (req, res) => {
    const { username, password } = req.body;

    let User = global.sequelizeModels.User
    try {
        // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = await User.create({ username, password });
        return res.status(200).json({
            status: 200,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
})

router.put('/update-password', valid.authValid.UpdatePassword, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    let User = global.sequelizeModels.User
    let user
    try {
        user = await User.findOne({
            where: {
                username: username
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }

    if (!user) {
        return res.status(400).json({
            status: 400,
            message: 'user does not exist',
        });
    }

    user.password = user.hashPassword(newPassword)
    user.save()

    return res.status(200).json({
        status: 200,
        message: 'change password successfully',
    });
})

router.put('/forgot-password', (req, res) => {
    console.log('forgot-password', req.body);
})

module.exports = router