const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const receipeSchema = new Schema(
	{
		name: {
			type: String,
			trim: true
		},
		brandUrl: {
			type: String,
			trim: true
		},
		directions: [String],
		prepTime: {
			type: String,
			trim: true
		},
		cookTime: {
			type: String,
			trim: true
		},
		readyIn: {
			type: String,
			trim: true
		},
		nutritionFacts: [
			{
				name: {
					type: String,
					trim: true
				},
				qty: {
					type: String,
					trim: true
				}
			}
		],
		favourites: {
			type: Number
		},
		ingredients: [
			{
				name: {
					type: String,
					trim: true
				},
				qty: {
					type: String,
					trim: true
				}
			}
		],
		meta: [String]
	},
	{ collection: 'receipe' }
);
/*componentListSchema
	.path('_id')
	.validate(validator.notEmpty(), '_id is required.');*/
module.exports = exports = mongoose.model('receipe', receipeSchema);
