'use strict';

var passport = require('passport'),
    path = require('path'),
    Users = require('../models/usermanagement'),
    utilities = require('./utilities');

module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        // return id of session user
        done(null, user && user._id);
    });

    // Deserialize sessions
    passport.deserializeUser(function(id, done) {
        // Find id in user database and return user object
        Users.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    // Initialize strategies
    utilities.walk('./server/config/strategies', /(.*)\.(js$|coffee$)/).forEach(function(strategyPath) {
        require(path.resolve(strategyPath))();
    });
};