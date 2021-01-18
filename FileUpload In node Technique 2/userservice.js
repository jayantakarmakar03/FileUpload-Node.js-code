var express = require("express");
var mongo = require("mongodb");
var ObjectID = mongo.ObjectID;
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require('../config');
var secretKey = config.secret;
var async = require("async");
//var moment = require('moment');
var crypto = require('crypto');
var mailProperty = require("../modules/sendMail");
var fs = require('fs');
const { STATUS_CONSTANTS, STATUS_MESSAGES, URL_PATHS, PATH_LOCATIONS, CONSTANTS } = require('../utils/constant');

createToken = (user) => {
    var tokenData = { id: user._id };
    var token = jwt.sign(tokenData, secretKey, {
        expiresIn: config.expirein
    });
    return token;
};

var UserService = {
   
    userEdit:(_id, data, fileData, callback)=>
    {
        
        if (!_id || typeof _id === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide id",
                "response_data": {},
                "success" : false,
                "error" : true,
            });
        } else if (!data.first_name || typeof data.first_name === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide firstname",
                "response_data": {},
                "success" : false,
                "error" : true,
            });
        } else if (!data.last_name || typeof data.last_name === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide firstname",
                "response_data": {},
                "success" : false,
                "error" : true,
            });
        } else if (!fileData || typeof fileData === undefined) {
            callback({
                "response_code": 5002,
                "response_message": "please provide profile image",
                "response_data": {},
                "success" : false,
                "error" : true,
            });
        } else 
        {
            function removePreviousImage()
            {
                    var imageFile      = fileData.profile_image;
                    var timeStamp      = Date.now();
                    var fileName       = timeStamp + imageFile.name;
                    var folderpath     = PATH_LOCATIONS.user_profile_pic_path ;
                    // let profilepicPath = config.profilepicPath;
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
                                        "response_data": err,
                                        "success" : false,
                                        "error" : true,
                                    });
                                } else {
        
                                     User.findOne({
                                                _id: _id
                                            }, {
                                                image: 1
                                            },
                                            function (err, result) 
                                            {
                                                
                                                if (result != null) {
                                                    if (result.image !== null) {
                                
                                                        let pf_image = `./public/uploads/user/${result.image}`;
                                                        fs.unlink(pf_image, (err) => {
                                                            if (err) {
                                                                console.log('error while image delete===>', err);
                                                            } else {
                                                                console.log(result.image + ' was deleted');
                                                            }
                                                        });
                                                    }
                                                } 
                                                
                                            });
        
                                            data.profile_image =  fileName;  
                                            data._id =_id ; 
                                            updateProfileImage(data);
                                }
                            }
                        )
                    } else {
                        callback({
                            status: 5002,
                            message: "MIME type not allowed please upload jpg or png file"
                        })
                    }
                
            };
            function updateProfileImage(data)
            {

                User.updateOne({
                    _id: data._id
                }, {
                    $set: {
                        image: data.profile_image,
                        first_name: data.first_name,
                        last_name: data.last_name
                    }
                }, function (err, resUpdate) 
                {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "error":err,
                            "success" : false,
                            "error" : true,
                        });
                    } else {
                        callback({
                            "success" : true,
                            "error" : false,
                            "message" :"Profile updated successfully",
                            "response_code": 2000,
                            "response_data": PATH_LOCATIONS.user_profile_pic_path_view + data.profile_image
                        });
                    }
                });

            };
            async function callmethods (){
                await removePreviousImage();
            }
            callmethods();
         }
    },

}

module.exports = UserService;