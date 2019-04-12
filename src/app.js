console.log('Hello')
// import jQuery from 'jquery'
// import 'bootstrap'
// import './scss/app.scss'
// import './css/dashboard.css'

//Get Dom Elements
const $selSupplier = $('#selSupplier')
const $selProduct = $('#selProduct')
const $tbodyProduct = $('#tbodyProduct')

//Data
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

//Update Product List
function handleSuplierChange(e){

  let supplier
  if(e)  supplier = e.target.value
  else  supplier = 'New Co Ltd.'

  const products = productArr.filter(product => product.supplier === supplier)

  //Clear Select Element
  $selProduct.empty()

  //Create options for Select Element
  const output = products.map(product => $(`<option value=${product.id}>${product.name}</option>`))

  //Add Options to Select element
  $selProduct.append(output)
}

//Display Product details
function handleProductChange(e){
  let productId
  if(e) productId = parseInt(e.target.value)
  else productId = 0

  //Find product by id
  const product = productArr.find( product => product.id === productId )

  //Clear Table
  $tbodyProduct.empty()

  //Create cells for Select Element and insert data
  const output = `<tr>
      <th>${product.id}</th>
      <th>${product.supplier}</th>
      <th>${product.name}</th>
      <th>${product.price}</th>
  </tr>`

  //Append table row to table
  $tbodyProduct.append(output)
}


//Add event Listeners
$selSupplier.on('change', handleSuplierChange)
$selProduct.on('change', handleProductChange)

//On load
handleSuplierChange()
handleProductChange()
