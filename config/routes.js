const router = require('express').Router()

const productsController = require('../controllers/products')
const suppliersController = require('../controllers/suppliers')

// PRODUCT ROUTES
router.route('/products')
  .get(productsController.index)

router.route('/products/:id')
  .get(productsController.show)


// SUPPLIER ROUTES
router.route('/suppliers')
  .get(suppliersController.index)

router.route('/suppliers/:id')
  .get(suppliersController.show)



router.all('/*', (req, res) => res.sendStatus(404))

module.exports = router
