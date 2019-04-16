require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

// const rp = require('request-promise')

mongoose.Promise = Promise

const Product = require('../models/product')
const Supplier = require('../models/supplier')

const productArr = [
  {
    name: 'Small wongle',
    price: 5,
    supplier: 'New Co Ltd.',
    reference: 0
  },
  {
    name: 'Large wongle',
    price: 8,
    supplier: 'New Co Ltd.',
    reference: 1
  },
  {
    name: 'Super wongle',
    price: 12,
    supplier: 'New Co Ltd.',
    reference: 2
  },
  {
    name: 'Mini wongle',
    price: 4,
    supplier: 'Old Co Ltd.',
    reference: 3
  },
  {
    name: 'Small wongle',
    price: 6,
    supplier: 'Old Co Ltd.',
    reference: 4
  },
  {
    name: 'Large wongle',
    price: 9,
    supplier: 'Old Co Ltd.',
    reference: 5
  },
  {
    name: 'Super wongle',
    price: 13,
    supplier: 'Old Co Ltd.',
    reference: 6
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
        const {name, supplier, price, reference} = product
        let sup
        switch(supplier){
          case 'New Co Ltd.':
            sup = suppliers.newCo
            break

          case 'Old Co Ltd.':
            sup = suppliers.oldCo
            break
        }
        return Product.create({
          name,
          supplier: sup,
          price,
          reference
        })
      }))
    })
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
