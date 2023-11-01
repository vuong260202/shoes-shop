var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;

let CONFIG = require('../config')

async function isLoggedIn(req, res, next) {
    if (req.headers.authorization) {
        console.log('checking jwt');
        return passport.authenticate('jwt-auth', { session: false }, (err, account) => {
            if (err) {
                console.log('err', err);
                return res.status(400).json({
                    status: 400,
                    message: (err.getMessage instanceof Function) ? err.getMessage() : (err + '')
                })
            }
        
            if (!account) {
                console.log('err', err);
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
            req.login(account, err => {
                if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Cannot login: ' + err
                })
                }
                return next()
            })
          // console.log('req.user', req.user);
          // console.log('req.user.email', req.user.username);
        })(req, res, next)
    }
    return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
    })
}

module.exports.isLoggedIn = isLoggedIn