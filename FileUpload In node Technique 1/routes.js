'use strict';
var express = require("express");
var apiService = require('../../services/apiService');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var secretKey = config.secretKey;

var api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
    extended: false
}));




/******************************
 *  Middleware to check token
 ******************************/
api.use(function (req, res, next) {

    //console.log('req.body------>',req.body)
    //console.log('req.headers------>',req.headers)
    //console.log('req.query------>',req.query)

    var token = req.body.authtoken || req.query.authtoken || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                res.send({
                    response_code: 4000,
                    response_message: "Session timeout! Please login again.",
                    response_data: err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            "response_code": 5002,
            "response_message": "Please provide required information"
        });
    }
});
/******************************
 *  Middleware to check token
 ******************************/

// Edit Profile Image
api.post('/edit-profileImage', function (req, res) {
    apiService.editProfileImage(req.body, req.files, function (response) {
        res.send(response);
    })
});

// Edit Profile
api.post('/edit-profile', function (req, res) {
    apiService.editProfile(req.body, function (response) {
        res.send(response);
    });
});

module.exports = api