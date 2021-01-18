var config = require('../config');
module.exports.STATUS_CONSTANTS = {
    REGISTER_SUCCESS: 1,
    REGISTER_FAIL: -1,
    AUTHENTICATION_FAILED: -2,
    USER_AUTHENTICATED: 2,
    USER_ALREADY_EXIST: 3,
    USER_DOES_NOT_EXIST: -3,
    INTERNAl_DB_ERROR: -5,
    IMAGE_UPLOADED_SUCCESSFULLY: 4,
    IMAGE_UPLOADED_FAILED: -4,
    SESSION_EXPIRED: -8,
    ACCOUNT_NOT_VERIFIED: -1,
    FAIL: 0,
    LOGIN_TYPES: {
        FB: 'FB',
        GOOGLE: 'GOOGLE',
        NORMAL: 'NORMAL'
    },
    SERVER_ERROR: 500
};

module.exports.PATH_LOCATIONS = {
    user_profile_pic_path: './public/uploads/user/',
    user_profile_pic_path_view: config.file_base_url + 'public/uploads/user/',
  
}

