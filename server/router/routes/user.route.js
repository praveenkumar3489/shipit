'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controller/userManagement.controller');
    // const middlewares = require('../../middlewares');

    router.route('/register')
        .post(controller.registerLocal);
    router.route('/login')
        .post(controller.loginLocal);
    app.use('/api',router);
};