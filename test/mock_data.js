const supplierData =[
  {
    name: 'New Co Ltd.'
  },
  {
    name: 'Old Co Ltd.'
  }
]


const productData = [
  {
    name: 'Small wongle',
    price: 5,
    supplier: 'New Co Ltd.',
    reference: 0,
    reflexAngle: '27°',
    flangeLength: '75mm'
  },
  {
    name: 'Large wongle',
    price: 8,
    supplier: 'New Co Ltd.',
    reference: 1,
    reflexAngle: '45°',
    flangeLength: '60mm'
  },
  {
    name: 'Super wongle',
    price: 12,
    supplier: 'New Co Ltd.',
    reference: 2,
    reflexAngle: '2°',
    flangeLength: '45mm'
  }
]

module.exports = {
  productData,
  supplierData
}
