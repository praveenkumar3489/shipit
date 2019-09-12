/**
 * Combine all module export
 */

'use strict';

var _ = require('lodash');


// Load app configuration
module.exports = _.merge(require(__dirname + '/environment/all.js'),
		require(__dirname + '/environment/development.js') || {});