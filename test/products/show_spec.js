/* global api, describe, it, expect, beforeEach */

const Product = require('../../models/product')
const Supplier = require('../../models/supplier')

let { productData } = require('../mock_data')
const { supplierData } = require('../mock_data')

let _product

describe('GET /products/:id', () => {
  beforeEach(done => {
    Promise.all([
      Supplier.remove({}),
      Product.remove({})
    ])
      .then(() => Supplier.create(supplierData[0]))
      .then(supplier => productData = productData.map(prod => {
        return {...prod, supplier }
      }) )
      .then((product) => Product.create(product))
      .then(product => {
        return _product = product[0]
      })
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get(`/api/products/${_product.id}`)
      .expect(200, done)
  })

  //
  // it('should return a 404 response', done => {
  //   api
  //     .get('/api/products/error')
  //     .expect(404, done)
  // })

  it('should return a product', done => {
    api
      .get(`/api/products/${_product.id}`)
      .end((err, res) => {
        expect(res.body).to.include.keys([
          'name',
          'supplier',
          'price',
          'reference'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get(`/api/products/${_product.id}`)
      .end((err, res) => {
        console.log('NAME',res.body.supplier.name, productData[0].supplier.name)
        expect(res.body.name).to.eq(productData[0].name)
        expect(res.body.price).to.eq(productData[0].price)
        expect(res.body.reference).to.eq(productData[0].reference)
        expect(res.body.supplier.name).to.eq(productData[0].supplier.name)
        done()
      })
  })
})
