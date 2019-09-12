'use strict';

module.exports = {
    mongodb: {
		database_uri:
			process.env.DATABASE_URI ||
			'mongodb://localhost:27017/shipitdb'
	},
	google: {
		GOOGLE_CLIENT_ID: "575502780007-rn3ndirn3lg420bd9pusdbiqdfbstnae.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET: "h6XKy6n0nd_c4jYy8teI41QA"
	},
	exchangePrice: {
    	'dollar': 71,
    	'rupees': 1,
    	'gbp': 95
    }
}