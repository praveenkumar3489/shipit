'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controller/recipes.controller');
    // const middlewares = require('../../middlewares');

    router.route('/recipes')
        .get(controller.list);
    app.use('/api',router);
};