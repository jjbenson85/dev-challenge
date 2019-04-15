const Product = require('../models/product')

//Index Route returns a response containing all products
function indexRoute(req, res, next) {
  Product
    .find()
    .populate({path: 'supplier', select: 'name'})
    // .populate([{path: 'supplier', select: 'name'}])
    .then(products => res.json(products))
    .catch(next)
}

function showRoute(req, res, next) {
  Product
    .findById(req.params.id)
    // .populate({path: 'products', select: 'name'})
    .then(product => res.json(product))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
