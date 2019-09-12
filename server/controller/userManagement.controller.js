const User = require('../models/usermanagement'),
    passport = require('passport'),
    _ = require('lodash');


/**************************
 ** Signin after passport **
 ** authentication        **
 **************************/
// Signin after passport authentication
// @body email, password
// return errorcode or user
exports.loginLocal = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
        return next({
            error: info,
            code: 400
        });
    } else {
        req.logIn(user, function(err) {
            if (err) {
                return next({
                    error: err,
                    code: 400
                });
            } else {
                res.jsonp(user);
            }
        });
    }
  })(req, res, next);
}



/**************************
 ** Register and login   **
 **************************/
// Register the user and login 
// @body email, password
// return errorcode or user
exports.registerLocal = function(req, res, next){
    // Init Variables
    var user = new User(req.body);
    var message = null;

    // Add missing user fields
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            console.error(err);
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Email or username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }
            return next({
                error: message,
                code: 400
            });
        }
        req.logIn(user, function(err) {
          if (err) {
            return next({
                error: err,
                code: 400
            });
          }
          res.jsonp(user);
        });
    });
};

