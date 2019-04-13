require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

// const rp = require('request-promise')

mongoose.Promise = Promise

const Product = require('../models/product')
const Supplier = require('../models/supplier')

const supplierArr = [
  {name: 'New Co Ltd.'},
  {name: 'Old Co Ltd.'}
]

const productArr = [
  {
    name: 'Small wongle',
    price: 5,
    supplier: 'New Co Ltd.',
    id: 0
  },
  {
    name: 'Large wongle',
    price: 8,
    supplier: 'New Co Ltd.',
    id: 1
  },
  {
    name: 'Super wongle',
    price: 12,
    supplier: 'New Co Ltd.',
    id: 2
  },
  {
    name: 'Mini wongle',
    price: 4,
    supplier: 'Old Co Ltd.',
    id: 3
  },
  {
    name: 'Small wongle',
    price: 6,
    supplier: 'Old Co Ltd.',
    id: 4
  },
  {
    name: 'Large wongle',
    price: 9,
    supplier: 'Old Co Ltd.',
    id: 5
  },
  {
    name: 'Super wongle',
    price: 13,
    supplier: 'Old Co Ltd.',
    id: 6
  }
]

// let newCo
// let oldCo

//Connect to database
mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  //Delete all database data
  db.dropDatabase()
    .then(()=>{
      return Promise.props({
        newCo: Supplier.create({
          name: 'New Co Ltd.'
        }),
        oldCo: Supplier.create({
          name: 'Old Co Ltd.'
        })
      })
    })
    .then((suppliers)=>{
      return Promise.all(productArr.map((product)=>{
        const {name, supplier, price} = product
        let sup
        if(supplier==='New Co Ltd.') sup = suppliers.newCo
        else sup = suppliers.oldCo
        return Product.create({
          name,
          supplier: sup,
          price
        })
      }))
    })
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
