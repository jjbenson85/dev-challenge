const Supplier = require('../models/supplier')

//Index Route returns a response containing all suppliers
function indexRoute(req, res, next) {
  Supplier
    .find()
    //Don't populate 'products' for supplier index
    // .populate({
    //   path: 'products',
    //   select: 'name'
    // })
    .then(suppliers => res.json(suppliers))
    .catch(next)
}


module.exports = {
  index: indexRoute
}
