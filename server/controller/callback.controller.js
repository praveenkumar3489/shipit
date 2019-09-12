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
exports.googleCallback = function(req, res, next) {
    passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    var user = new User({
	    	email: "praveen.mait@gmail.com",
	    	name: 'praveen'
	    });
	    user.save(function(err) {
	        res.redirect('/');
	    });
	}(req, res, next);
}
