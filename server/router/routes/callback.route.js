'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    let passport = require('passport');
    
    var controller = require('../../controller/callback.controller');
    // const middlewares = require('../../middlewares');

    router.route('/google/callback')
        .get(controller.googleCallback);
    router.route('/auth/google')
    	.get(passport.authenticate('google', { scope: ['email', 'profile'] }));
    app.use('/api',router);
};