const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: 'Product name is required'},
  supplier: { type: mongoose.Schema.ObjectId, ref: 'Supplier'},
  price: { type: Number},
  reference: { type: Number }
})

//Remove __v tag when returning JSON
productSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.__v
    delete json.id
    return json
  }
})

module.exports = mongoose.model('Product', productSchema)
