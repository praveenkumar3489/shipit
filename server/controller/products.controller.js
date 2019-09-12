const Products = require('../models/products'),
	User = require('../models/usermanagement'),
	config = require('../config');
    _ = require('lodash');



exports.list = function(req, res, next){
 	searchDetails = req.query;
	if(  _.isUndefined(searchDetails.searchtext) ){
		searchDetails.searchtext ='';
	}
    Products.find(
    {
		'$or': [{
			'name':{
				'$regex':searchDetails.searchtext,
				"$options":'-i'
			}
		}]
        
    })
    .exec(function(err, data){
		res.jsonp({
			'message':'success',
			'resultMessage':'Product list is successfully.',
			'results':data,
			'page':page,
			'perPage':perPage,
			'totalItems':cnt
		})
		if (err) return res.status(400).send({
	          	message: JSON.stringify(err)
	        });
	})
  
}




/************************************
 ** Fetch the detail of class      **
 ************************************/
// Fetch the detail of the class 
// if same class name already present
// @body cid
// return message, resultmessage, result
exports.getItem = function(req, res, next) {
	let pid = req.params.pid
    Products.find({
	'name':
		{
		  '$regex':searchDetails.searchtext,
		  "$options":'-i'
		}
    })
    .exec(function(err, data){
		Products.count(
			{
			'name':
			  {
			    '$regex':searchDetails.searchtext,
			    "$options":'-i'
			  }
			}, function(err, cnt){
			res.jsonp({
			  'message':'success',
			  'resultMessage':'Product list',
			  'results':data,
			  'page':page,
			  'perPage':perPage,
			  'totalItems':cnt
			})
			})
			if (err)
			return res.status(400).send({
			  message: getErrorMessage(err)
			});
		})
}


/************************************
 ** Update already existing class  **
 ************************************/
// Api update already existing class 
// if same class name already present
// @body name, description
// return message, resultmessage, result
exports.update = function(req, res, next) {
	productDetail = req.body;
	let pid = req.params.pid
	Products.findOne({
        '_id':pid
	}, function(err, Product){
		Product.plu = productDetail.plu || Product.plu;
		Product.name = productDetail.name || Product.name;
		Product.description = productDetail.description || Product.description;
    	Product.loyalityPoints= productDetail.loyalityPoints || Product.loyalityPoints;
    	Product.brandPageUrl= productDetail.brandPageUrl || Product.brandPageUrl;
    	if(_.has(productDetail, 'price')){
    		productDetail.price['dollar'] = productDetail.price * config.exchangePrice.dollar;
    		productDetail.price['rupees'] = productDetail.price * config.exchangePrice.rupees
    		productDetail.price['gbp'] = productDetail.price * config.exchangePrice.gbp
    	}
    	if(_.has(productDetail, 'category')){
    		if(typeof(productDetail.category) ==='String') {
    			Product.category.push(productDetail.category.split(','))
    		}
    		if(typeof(productDetail.category) ==='Object') {
    			Product.category = productDetail.category
    		}
    	}
    	if(_.has(productDetail, 'meta')){
    		if(typeof(productDetail.meta) ==='String') {
    			Product.meta.push(productDetail.meta.split(','))
    		}
    		if(Array.isArray(productDetail.meta) ==='Array') {
    			Product.meta = productDetail.meta
    		}
    	}
	})
}

/*************************
 ** Create a new class  **
 **************************/
// Api creates a new class 
// if same class name already not present
// @body name, description
// return message, resultmessage, result

exports.create = function(req, res, next) {
    let productDetail = req.body;
    let products =  new Products(req.body);
    products.save(function(err, data) {
    	console.log(err);
		if (err) return res.status(400).jsonp({
			"message": "Failure",
			"resultMessage": err
		});
		else return res.jsonp({
			'message': 'success',
			'resultMessage': 'Product is successfully created',
			'result': data
		});
    })
    
}
