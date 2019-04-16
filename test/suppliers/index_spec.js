/* global api, describe, it, expect, beforeEach */

const Supplier = require('../../models/supplier')

const { supplierData } = require('../mock_data')

describe('GET /suppliers', () => {
  beforeEach(done => {
    Promise.all([
      Supplier.remove({})
    ])
      .then(() => Supplier.create(supplierData[0]))
      .then(() => Supplier.create(supplierData[1]))
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/suppliers')
      .expect(200, done)
  })

  it('should return an array of suppliers', done => {
    api
      .get('/api/suppliers')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(_supplier => {
          expect(_supplier).to.include.keys([
            'name'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach((_supplier, i) => {
          expect(_supplier.name).to.eq(supplierData[i].name)
        })
        done()
      })
  })
})
