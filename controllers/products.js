const Products = require('../models/product')

//Index Route returns a response containing all products
function indexRoute(req, res, next) {
  Products
    .find()
    .populate('supplier')
    // .populate([{path: 'supplier', select: 'name'}])
    .then(products => res.json(products))
    .catch(next)
}

function supplierRoute(req, res, next) {
  Products
    .find()
    .then(products => res.json(products))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  suppliers: supplierRoute
}
