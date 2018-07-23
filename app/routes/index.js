const inventoryRoutes = require('./inventory_routes');
const shoppingRoutes = require("./shopping_routes");

module.exports = function(app,db){
    inventoryRoutes(app,db);
    shoppingRoutes(app,db);
}