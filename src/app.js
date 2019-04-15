
import axios from 'axios'

//Lets
let productArr
let supplierArr
let $selSupplier
let $selProduct
let $tbodyProduct

//build Supplier options
function buildSupplierOptions(suppliers){
  console.log(suppliers)
  const output = suppliers.map(supplier => $(`<option value=${supplier._id}>${supplier.name}</option>`))

  //Add default message
  output.unshift($('<option selected disabled hidden>Select A Supplier</option>'))

  //Add Options to Select element
  $selSupplier.append(output)

}


function buildProductOptions(products){
  //Create options for Select Element
  const output = products.map(product => $(`<option value=${product._id}>${product.name}</option>`))

  //Add default message
  output.unshift($('<option selected disabled hidden>Select A Product</option>'))

  //Add Options to Select element
  $selProduct.append(output)
}


//Update Product List
function handleSupplierChange(e){
  let supplierId
  if(e)  supplierId = e.target.value
  else  supplierId = supplierArr[0]._id

  //Request Data from server
  axios.get(`/api/suppliers/${supplierId}`)
    .then(res => {
      productArr = res.data.products

      // const products = productArr.filter(product => product.supplier.name === supplier)
      const products = res.data.products

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

  axios.get(`/api/products/${productId}`)
    .then(res => {

      const product = res.data

      //Clear Table
      $tbodyProduct.empty()

      //Create cells for Select Element and insert data
      const output = `<tr>
      <td>${product.reference}</td>
      <td>${product.supplier.name}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      </tr>`

      //Append table row to table
      $tbodyProduct.append(output)

    })
    .catch(err=> console.error(err.message))

  // //Find product by id
  // const product = productArr.find( product => product._id === productId )
  // console.log(product)
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
    .then(res => {
      supplierArr = res.data
      buildSupplierOptions(supplierArr)
    })
    //Build Product Options
    .then( ()=>  handleSupplierChange())
    .catch(err=> console.error(err.message))



})
