'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controller/products.controller');
    // const middlewares = require('../../middlewares');

    router.route('/product')
        .post(controller.create);
    router.route('/product/:pid')
        .put(controller.update);
    router.route('/product/:pid')
        .get(controller.getItem);
    router.route('/product')
        .get(controller.list);
    app.use('/api',router);
};