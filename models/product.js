const mongoose = require('mongoose')

const poductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  supplier: { type: String, required: true },
  price: { type: Number}
})

//Remove __v tag when returning JSON
poductSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Poduct', poductSchema)
