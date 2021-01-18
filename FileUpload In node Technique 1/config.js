module.exports = {
    "port": 1446,
    "secretKey": "hyrgqwjdfbw4534efqrwer2q38945765",
    "link_expire": 172800,
    'liveUrl': "https://nodeserver.mydevfactory.com:1446/",

    dbAccess: 'server',
    database: {
        'server': {
            username: 'brain1uMMong0Userfsdf',
            password: 'PL5qnU9nuvX0pfdfBafsdf',
            host: 'nodeserver.mydevfactory.com',
            port: '27017',
            dbName: 'fit4-your-sport',
            authDb: 'admin'
        },
        'local': {
            port: 27017,
            host: "localhost",
            dbName: "fit4-your-sport"
        }
    },
    email: {
        database: "mongodb://localhost:27017/fit4yoursport",
        MAIL_USERNAME: "liveapp.brainffdsium@gmail.com",
        MAIL_PASS: "YW5kcm9pZfdsDIwMTfsdfY"
    },
    twillow: {
        live: {
            accountSid: "AC60641b0365287e334555796ca998d402",
            authToken: "a702091fd4c8089a7f7e80ff6ae2dfed",
            from_no: "+12062600506"
        },
        test: {
            accountSid: "AC3f4b8426a5026d7441f19a8b6c68fc18",
            authToken: "823efaec212bb07953b54a00f87a8ebd",
            from_no: "+15005550006"
        }
    },
  
    userDemoPicPath: "uploads/dummy/demo-profile.png",

    uploadProfilepicPath: "public/uploads/profilepic/",
    profilepicPath: "uploads/profilepic/",


    // socketUrl: "https://nodeserver.brainiuminfotech.com:1426/",
    baseUrl: "https://nodeserver.mydevfactory.com/dibyendu/FitTripAdmin/",
    logPath: "/ServiceLogs/admin.debug.log",
    templatePath:"https://nodeserver.mydevfactory.com/dibyendu/fitTripPartner/",

    dev_mode: true,
    __root_dir: __dirname,
    __site_url: '',
    limit: 10

}