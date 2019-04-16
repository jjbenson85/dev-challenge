const Product = require('../models/product')

//Index Route returns a response containing all products
function indexRoute(req, res, next) {
  Product
    .find()
    //Populate 'supplier' for supplier show, but show only supplier name
    .populate({path: 'supplier', select: 'name'})
    .then(products => res.json(products))
    .catch(next)
}

function showRoute(req, res, next) {
  Product
    .findById(req.params.id)
    //Populate 'supplier' for supplier show, but show only supplier name
    .populate({path: 'supplier', select: 'name'})
    .then(product => res.json(product))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
