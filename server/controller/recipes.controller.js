const receipe = require('../models/receipeModel'),
    passport = require('passport'),
    _ = require('lodash');


exports.list = function(req, res) {
	console.log('query params', req.query);
	let filter = {},
		meta = [];
	if (req.query.meta) {
		meta = req.query.meta.split(',');
		filter = { meta: { $in: meta } };
	}
	console.log('filter', filter);

	receipe.find(filter, (err, docs) => {
		if (err) {
			console.log('err', err);
		}
		console.log(docs.length);
		console.log(meta.length);
		if (meta.length > 2) {
			for (let doccount = 0; doccount < docs.length - 1; doccount++) {
				var matchingcount = _intersection(docs[doccount][meta], meta);
				console.log(matchingcount);
			}
		} else {
			let result = docs;
		}

		res.status(200).send(docs);
	});
}
