const receipe = require('../models/receipeModel'),
	passport = require('passport'),
	_ = require('lodash');

exports.list = function(req, res) {
	let filter = {};
	let reqmeta = [];
	let result = [];
	if (req.query.meta) {
		reqmeta = req.query.meta.split(',');
		filter = { meta: { $in: reqmeta } };
	}

	receipe.find(filter, (err, docs) => {
		if (err) {
			console.log('err', err);
		}
		result = docs;
		if (reqmeta.length > 1) {
			for (let doccount = 0; doccount < result.length; doccount++) {
				let matchingcount = _.intersection(result[doccount]['meta'], reqmeta);
				result[doccount] = { ...result[doccount].toObject(), matchcount: matchingcount.length };
			}

			result = _.orderBy(result, ['matchcount'], ['desc']);
			res.status(200).send(result);
		} else {
			result = docs;
			res.status(200).send(result);
		}
	});
};
