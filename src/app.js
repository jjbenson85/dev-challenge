
import axios from 'axios'



//Lets
let productArr
let $selSupplier
let $selProduct
let $tbodyProduct

//build Supplier options
function buildSupplierOptions(suppliers){
  console.log(suppliers)
  const output = suppliers.map(supplier => $(`<option>${supplier.name}</option>`))
  //Add default message
  output.unshift($('<option selected disabled hidden>Select A Supplier</option>'))
  //Add Options to Select element
  $selSupplier.append(output)
}


function buildProductOptions(products){
    console.log(products)
  //Create options for Select Element
  const output = products.map(product => $(`<option value=${product._id}>${product.name}</option>`))

  //Add default message
  output.unshift($('<option selected disabled hidden>Select A Product</option>'))

  //Add Options to Select element
  $selProduct.append(output)
}


//Update Product List
function handleSupplierChange(e){
  let supplier
  if(e)  supplier = e.target.value
  else  supplier = 'New Co Ltd.'

  //Request Data from server
  axios.get('/api/products')
    .then(res => {
      productArr = res.data
      const products = productArr.filter(product => product.supplier.name === supplier)

      //Clear Select Element
      $selProduct.empty()

      //Clear Table
      $tbodyProduct.empty()

      //Build Product options
      buildProductOptions(products)

    })
    .catch(err=> console.error(err.message))

}

//Display Product details
function handleProductChange(e){

  // let productId
  const productId = e.target.value

  //Find product by id
  const product = productArr.find( product => product._id === productId )

  //Clear Table
  $tbodyProduct.empty()

  //Create cells for Select Element and insert data
  const output = `<tr>
      <td>${product._id}</td>
      <td>${product.supplier.name}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
  </tr>`

  //Append table row to table
  $tbodyProduct.append(output)
}



//On load
$(()=>{
  console.log('Hello')

  //Get Dom Elements
  $selSupplier = $('#selSupplier')
  $selProduct = $('#selProduct')
  $tbodyProduct = $('#tbodyProduct')

  //Add event Listeners
  $selSupplier.on('change', handleSupplierChange)
  $selProduct.on('change', handleProductChange)

  //Get data
  axios.get('/api/suppliers')
    //Build Supplier Options
    .then(res => buildSupplierOptions(res.data))
    //Build Product Options
    .then( ()=>  handleSupplierChange())
    .catch(err=> console.error(err.message))



})
