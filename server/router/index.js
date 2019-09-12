'use strict';

const routes = [
    require('./routes/user.route'),
    require('./routes/callback.route'),
    require('./routes/products.route'),
    require('./routes/recipes.route')
];

module.exports = function router(app) {
    return routes.forEach((route) => {
      	route(app);
    });
};