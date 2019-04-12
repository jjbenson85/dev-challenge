console.log('Hello')


//Globals
let selectedSupplier
let selectedProductId

//Get Dom Elements
const $selSupplier = $('#selSupplier')
const $selProduct = $('#selProduct')
const $tbodyProduct = $('#tbodyProduct')


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


//Get supplier
$selSupplier.on('change', handleSuplierChange)
$selProduct.on('change', handleProductChange)


//Update Product List
function handleSuplierChange(e){

  console.log(e.target.value)
  selectedSupplier = e.target.value
  const products = productArr.filter(product => product.supplier === e.target.value)

  //Clear Select Element
  $selProduct.empty()

  //Create options for Select Element
  const output = products.map(product => $(`<option value=${product.id}>${product.name}</option>`))

  //Add Options to Select element
  $selProduct.append(output)
}

//Display Product details
function handleProductChange(e){
  console.log(e.target.value)
  selectedProductId = e.target.value

  const product = productArr.find( product => product.id === parseInt(selectedProductId) )
  console.log(product, productArr, parseInt(selectedProductId) )

  //Clear Table
  $tbodyProduct.empty()

  //Create cells for Select Element
  const output = `<tr>
      <th>${product.id}</th>
      <th>${product.supplier}</th>
      <th>${product.name}</th>
      <th>${product.price}</th>
  </tr>`

  //Append table row to table
  $tbodyProduct.append(output)
}
