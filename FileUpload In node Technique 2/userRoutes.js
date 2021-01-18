var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../../config');
var user = express.Router();
var UserService = require('../../services/userService');
const { STATUS_CONSTANTS, STATUS_MESSAGES } = require('../../utils/constant');


/******************************
 *  Middleware to check token
 ******************************/
user.use(function (req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.send({
                    success: false,
                    error: true,
                    status: STATUS_CONSTANTS.AUTHENTICATION_FAILED, 
                    message: "Failed to authenticate or token expired."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            success: false,
            error: true,
            message: "Please provide token"
        });
    }
});

/******************************
 *  Middleware to check token
 ******************************/

 
user.post('/user_update', function (req, res) {
    UserService.userEdit(req.decoded.id, req.body, req.files,function (response) {
        res.json(response);
    });
});



module.exports = user;