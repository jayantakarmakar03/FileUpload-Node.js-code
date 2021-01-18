var UserSchema = require('../schema/user');
var ActivityExerciseSchema = require('../schema/activity_and_exercise');
var goalSchema = require('../schema/goal');
var exerciseSchema = require('../schema/exercise');
var walkingStepsSchema = require('../schema/walking_steps');
var videoSchema = require('../schema/video');
var tipSchema = require('../schema/tips');
var foodSchema = require('../schema/food');
var subscriptionSchema = require('../schema/subscription');



var AdminSchema = require('../schema/admin');
var config = require('../config');
const paytabs = require('paytabs_api');
var async = require("async");
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt');

var fs = require('fs');
var jwt = require('jsonwebtoken');
var mailProperty = require('../modules/sendMail');
var secretKey = config.secretKey;
var cron = require('node-cron');
var AdminNotificationModels = require('../models/admin_notification');
var pushNotification = require('../modules/pushNotification');
var cron = require('node-cron');
const { query } = require('express');
//create auth token
createToken = (admin) => {
    var tokenData = {
        id: admin._id
    };
    var token = jwt.sign(tokenData, secretKey, {
        expiresIn: 2592000
    });
    return token;
};
function generateOtp(){
   return Math.floor(100000 + Math.random() * 900000);
}
function generateString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

var UserModels = {
    //Update Profile image
    editProfileImage: function (data, callback) {
        if (data) 
        {
            console.log('modal works====>');

            UserSchema.updateOne({
                _id: data._id
            }, {
                $set: {
                    profile_image: data.profile_image,
                    profile_image_updated: true,
                }
            }, function (err, resUpdate) 
            {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "error":err
                    });
                } else {
                    callback({
                        "response_code": 2000,
                        "response_message": "Profile image has been changed.",
                        "response_data": config.liveUrl + data.profile_image
                    });
                }
            });

           
        } else {
            callback({
                "response_code": 5005,
                "response_message": "INTERNAL DB ERROR",
                "response_data": {}
            });
        }
    },
    // Edit Profile
    editProfile: function (data, callback) 
    {
        if (data) {
            UserSchema.findOne({
                _id: data._id
                },
                function (err, result) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        });
                    } else {
                        if (result == null) {
                            callback({
                                "response_code": 5002,
                                "response_message": "User is not valid.",
                                "response_data": {}
                            });
                        } else {


                            UserSchema.updateOne({
                                _id: data._id
                            }, {
                                $set: {
                                    fname         : data.fname,
                                    lname         : data.lname,
                                    dob           : data.dob,
                                    phone_no      : data.phone_no,
                                    address       : data.address,
                                    country       : data.country,
                                    gender        : data.gender,
                                    sports        : data.sports,
                                    height        : data.height,
                                    weight        : data.weight,
                                    injuries      : data.injuries,
                                    injury_details: data.injury_details,
                                }
                            }, function (err, resUpdate) {
                                if (err) {
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    });
                                } else {
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "Profile updated successfully.",
                                        "response_data": {}
                                    });
                                }
                            });
                        }
                    }
                });
        } else {
            callback({
                "response_code": 5005,
                "response_message": "INTERNAL DB ERROR",
                "response_data": {}
            });
        }
    },
   
};
module.exports = UserModels;