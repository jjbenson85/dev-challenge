const mongoose = require('mongoose')

const poductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false }
})

//Remove __v tag when returning JSON
poductSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Poduct', poductSchema)
