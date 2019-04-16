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
    reference: 0,
    flangeLength: '75mm'
  },
  {
    name: 'Large wongle',
    price: 8,
    supplier: 'New Co Ltd.',
    reference: 1,
    flangeLength: '60mm'
  },
  {
    name: 'Super wongle',
    price: 12,
    supplier: 'New Co Ltd.',
    reference: 2,
    flangeLength: '45mm'
  },
  {
    name: 'Mini wongle',
    price: 4,
    supplier: 'Old Co Ltd.',
    reference: 3,
    flangeLength: '333mm'
  },
  {
    name: 'Small wongle',
    price: 6,
    supplier: 'Old Co Ltd.',
    reference: 4,
    reflexAngle: '96°'
  },
  {
    name: 'Large wongle',
    price: 9,
    supplier: 'Old Co Ltd.',
    reference: 5,
    reflexAngle: '120°'
  },
  {
    name: 'Super wongle',
    price: 13,
    supplier: 'Old Co Ltd.',
    reference: 6,
    reflexAngle: '25°'
  },{
    name: 'Ultra wongle',
    price: 13,
    supplier: 'James Co Ltd.',
    reference: 7,
    reflexAngle: '360°',
    flangeLength: '0.5mm'
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
        }),
        jamesCo: Supplier.create({
          name: 'James Co Ltd.'
        })
      })
    })
    .then((suppliers)=>{
      return Promise.all(productArr.map((product)=>{
        const {name, price, reference, flangeLength, reflexAngle} = product
        let { supplier }  = product
        switch(supplier){
          case 'New Co Ltd.':
            supplier = suppliers.newCo
            break

          case 'Old Co Ltd.':
            supplier = suppliers.oldCo
            break

          case 'James Co Ltd.':
            supplier = suppliers.jamesCo
            break
        }
        return Product.create({
          reference,
          name,
          supplier,
          price,
          flangeLength,
          reflexAngle
        })
      }))
    })
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
