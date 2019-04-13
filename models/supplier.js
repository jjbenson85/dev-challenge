const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false }
})

//Remove __v tag when returning JSON
supplierSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

// supplierSchema.virtual('product', {
//   ref: 'Product',
//   localField: '_id',
//   foreignField: 'supplier'
// })

module.exports = mongoose.model('Supplier', supplierSchema)
