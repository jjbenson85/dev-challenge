const Supplier = require('../models/supplier')

//Index Route returns a response containing all suppliers
function indexRoute(req, res, next) {
  Supplier
    .find()
    .populate({path: 'products', select: 'name'})
    .then(suppliers => res.json(suppliers))
    .catch(next)
}

function showRoute(req, res, next) {
  Supplier
    .findById(req.params.id)
    .populate({path: 'products', select: 'name'})
    .then(supplier => res.json(supplier))
    .catch(next)
}



module.exports = {
  index: indexRoute,
  show: showRoute
}
