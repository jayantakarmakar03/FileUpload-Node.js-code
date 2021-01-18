'use strict';
var config = require('../config');
var async = require("async");
var mongo = require('mongodb');
var jwt = require('jsonwebtoken');
var fs = require('fs')
var ObjectID = mongo.ObjectID;

var mailProperty = require('../modules/sendMail');
var UserModels = require('../models/user');
var AdminModels = require('../models/admin');
var UserSchema = require('../schema/user');


var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var apiService = {

    
    //Edit Profile Image
   
    editProfileImage: (data, fileData, callback) => {

        if (!data._id || typeof data._id === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide id",
                "response_data": {}
            });
        } else if (!fileData || typeof fileData === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide profile image",
                "response_data": {}
            });
        } else {
            var imageFile      = fileData.profile_image;
            var timeStamp      = Date.now();
            var fileName       = timeStamp + imageFile.name;
            var folderpath     = config.uploadProfilepicPath;
            let profilepicPath = config.profilepicPath;
            let split          = imageFile
                                 .mimetype
                                 .split("/");
            if (split[1] = "jpeg" || "png" || "jpg") 
            {
                imageFile.mv(
                    folderpath + fileName,
                    function (err) {
                        if (err) {
                            callback({
                                "response_code": 5005,
                                "response_message": "INTERNAL DB ERROR",
                                "response_data": err
                            });
                        } else {

                             UserSchema.findOne({
                                        _id: data._id
                                     }, {
                                         profile_image: 1
                                     },
                                     function (err, result) {
                                         console.log('result====>', result);
                                         
                                         if (result != null) {
                                            if (result.profile_image !== null) {
                        
                                                let pf_image = `./public/${result.profile_image}`;
                                                fs.unlink(pf_image, (err) => {
                                                    if (err) {
                                                        console.log('error while image delete', err);
                                                    } else {
                                                        console.log(result.profile_image + ' was deleted');
                                                    }
                                                });
                                            }
                                         } 
                                        
                                     });

                                    data.profile_image = profilepicPath + fileName;
                                    UserModels.editProfileImage(data, function (result) {
                                        callback(result);
                                    });
                        }
                    }
                )
            } else {
                callback({
                    status: 5002,
                    message: "MIME type not allowed please upload jpg or png file"
                })
            }
        }
    },
    // Edit Profile
    editProfile: (data, callback) => {
        
        if (!data._id || typeof data._id === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide id",
                "response_data": {}
            });
        } else {

            UserModels.editProfile(data, function (result) {
                callback(result);
            })
        }
    },
 
   
   
};
module.exports = apiService;