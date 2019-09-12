'use strict';

var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    config = require('../../config'),
    Users = require('../../models/usermanagement');


module.exports = function() {
    // Use local strategy
    passport.use(new GoogleStrategy({
	    clientID: config.google.GOOGLE_CLIENT_ID,
	    clientSecret: config.google.GOOGLE_CLIENT_SECRET,
	    callbackURL: "http://localhost:3000/api/google/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	  	console.log("accessToken >>", accessToken);
	  	console.log("refreshToken >>", refreshToken);
	  	console.log("profile >>", profile);
	    Users.save({ 
	    	googleId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            googlepProfile: profile }, function (err, user) {
      	return cb(err, user);
	    });
	  }
	));
};