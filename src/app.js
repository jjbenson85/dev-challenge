import axios from 'axios'

//On load
$(()=>{
  console.log('Application loaded')
  //Get Dom Elements
  const $selSupplier = $('#selSupplier')
  const $selProduct = $('#selProduct')
  // const $tbodyProduct = $('#tbodyProduct')
  const $table = $('#table')

  //Add event Listeners
  $selSupplier.on('change', (e) => handleSupplierChange(e, $selProduct, $table))
  $selProduct.on('change', (e) => handleProductChange(e, $table))

  //Get data
  axios.get('/api/suppliers')

    .then(res => {
      console.log('Successfull /api/suppliers request')

      const suppliers = res.data

      //Build Supplier Options
      buildSelectOptions($selSupplier, suppliers, 'Supplier')

      //Add Default message to Product Select element
      $selProduct.append('<option selected disabled hidden>Select A Supplier First</option>')
    })

    .catch(err=> console.error(err.message))

})

//Lets
// let $selSupplier
// let $selProduct
// let $tbodyProduct
//
// //build Supplier options
// function buildSupplierOptions(suppliers){
//
//   //Create array of option elements for jQuery to create
//   const output = suppliers.map(supplier => $(`<option value=${supplier._id}>${supplier.name}</option>`))
//
//   //Add default message
//   output.unshift($('<option selected disabled hidden>Select A Supplier</option>'))
//
//   //Add Options to Select element
//   $selSupplier.append(output)
//
// }
//
//
// function buildProductOptions(products){
//
//   //Create options for Select Element
//   const output = products.map(product => $(`<option value=${product._id}>${product.name}</option>`))
//
//   //Add default message
//   output.unshift($('<option selected disabled hidden>Select A Product</option>'))
//
//   //Add Options to Select element
//   $selProduct.append(output)
// }

function buildSelectOptions(select, array, type){
  console.log(`Building ${type} <select> options`)
  //Clear Select Element
  select.empty()

  //Create options for Select Element
  const output = array.map(item => $(`<option value=${item._id}>${item.name}</option>`))

  //Add default message
  output.unshift($(`<option selected disabled hidden>Select A ${type}</option>`))

  //Add Options to Select element
  select.append(output)
}


function buildTableRow(product, table){
  console.log('Building Table')

  //Clear Table
  table.empty()


  //Create cells for Select Element and insert data
  delete product._id
  const props = Object.keys(product)
  const vals = Object.values(product)

  //const output =
  // `<tr>
  //   <td>${product.reference}</td>
  //   <td>${product.supplier.name}</td>
  //   <td>${product.name}</td>
  //   <td>${product.price}</td>
  // </tr>`

  /* eslint-disable indent */
  const output =
  `<thead>
    <tr>
      ${props.map(prop => {
        if(prop==='reference') return '<th>#</th>'

        //Split at capital letter and title case words
        const output = prop.split(/(?=[A-Z])/)
        .map((el) => el.charAt(0)
        .toUpperCase()+el.substr(1) )
        .join(' ')

        return `<th>${output}</th>`
      })}
    </tr>
  </thead>
  <tbody>
    <tr>
      ${vals.map((val,i) => {
        if(props[i]==='supplier') return `<td>${product.supplier.name}</td>`
          return `<td>${val}</td>`
        })}
    </tr>
  </tbody>`

  /* eslint-enable indent */

  //Append table row to table
  table.append(output)
}

//Display Product details
function handleProductChange(e, table){
  console.log('Handle product <select> change')

  // let productId
  const productId = e.target.value

  //Request single product details
  axios.get(`/api/products/${productId}`)

    .then(res => {
      console.log(`Successful /api/products/${productId} request` )

      buildTableRow(res.data, table)
    })
    .catch(err=> console.error(err.message))

  // FRONT END DATA SEARCH
  // //Find product by id
  // const product = productArr.find( product => product._id === productId )
}

//Update Product List
function handleSupplierChange(e, select, table){
  console.log('Handle supplier <select> change')

  const supplierId = e.target.value

  //Request Data from server
  axios.get(`/api/suppliers/${supplierId}`)
    .then(res => {
      console.log(`Successful /api/suppliers/${supplierId} request` )
      const products = res.data.products

      //Clear Table
      table.empty()

      //Build Product options
      buildSelectOptions(select, products, 'Product')

      //FRONT END DATA FILTER
      // productArr = res.data.products
      // const products = productArr.filter(product => product.supplier.name === supplier)
    })
    .catch(err=> console.error(err.message))

}
