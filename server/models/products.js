const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const shortId = require('shortid');

// Product Schema

var ProductSchema = new Schema({
    plu: {
        type: String,
        unique: true,
        required: true,
        'default': shortId.generate
    },
    name: String,
    price: {
    	'dollar': Number,
    	'ruppes': Number,
    	'gbp': Number
    },
    description: String,
    loyalityPoints: Number,
    categories: [String],
    meta: [String],
    brandPageUrl: String,
    retailers: [{
    	"name": String,
    	"url": String
    }]
});

ProductSchema.plugin(require('mongoose-timestamp'));
module.exports = mongoose.model('Products', ProductSchema);