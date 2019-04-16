/* global api, describe, it, expect, beforeEach */

const Product = require('../../models/product')
const Supplier = require('../../models/supplier')

let { productData } = require('../mock_data')
const { supplierData } = require('../mock_data')

describe('GET /products', () => {
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
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/products')
      .expect(200, done)
  })

  it('should return an array of products', done => {
    api
      .get('/api/products')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(_product => {
          expect(_product).to.include.keys([
            'name',
            'supplier',
            'price',
            'reference'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/products')
      .end((err, res) => {
        res.body.forEach((_product, i) => {
          expect(_product.name).to.eq(productData[i].name)
          expect(_product.price).to.eq(productData[i].price)
          expect(_product.reference).to.eq(productData[i].reference)
          expect(_product.supplier.name).to.eq(productData[i].supplier.name)
        })
        done()
      })
  })
})
