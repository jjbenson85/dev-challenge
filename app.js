console.log('Hello')

//Get Dom Elements

const $selSupplier = $('#selSupplier')
const $selProduct = $('#selProduct')

const oldCo = ['Small wongle', 'Large wongle', 'Super wongle']
const newCo = ['Mini Wongle', 'Small Wongle', 'Large Wongle', 'Super Wongle']
const productArr = {oldCo, newCo}


//Get supplier
$selSupplier.on('change', handleSuplierChange)
$selProduct.on('change', handleProductChange)

//Update Product List
function handleSuplierChange(e){

  console.log(e.target.value)
  const supplier = e.target.value
  const products = productArr[supplier]

  //Clear Select Element
  $selProduct.empty()

  //Create options for Select Element
  const output = products.map(product => $(`<option>${product}</option>`))

  //Add Options to Select element
  $selProduct.append(output)
}

//Display Product details
function handleProductChange(e){
  console.log(e.target.value)
}
