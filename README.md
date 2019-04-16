# [JDLT](https://jdlt.co.uk) full-stack developer challenge

## Brief
**Please demonstrate:**
* Selecting suppliers and products in the drop-downs
* A round-trip to a server pulling back prices
* Displaying the returned data in the grid
* Anything else you'd like to show us

## Timeframe:
18 hours over 3 days

## Technologies used
* JavaScript (ES6) / HTML5 / SCSS
* jQuery
* Mongo / Mongoose
* Express
* Chai / Mocha / Supertest
* Axios
* Bluebird
* Node.js
* Git / GitHub
* webpack


## Installation
1. Clone or download the repo
1. ```yarn``` to install JavaScript packages
1. ```yarn seed``` to create initial data for the database
1. ```yarn run build```
1. ```yarn run start```
1. Open your local host on port 4000


## Project overview
This project requests data from a Mongo database using axios requests and presents the data on the webpage using jQuery.
The select boxes and table headers and content are produced dynamically from the response data.

In the source code, I have intentionally left commented out code to show how the project progressed, and console logs, to show how the application functions.


####  jQuery
I have tried to demonstrate my familiarity with jQuery and its ability to manipulate the DOM.
An example of this is the ```buildSelectOptions()``` function in ```app.js```.

```
function buildSelectOptions(select, array, type){
  //Clear Select Element
  select.empty()

  //Create options for Select Element
  const output = array.map(item => $(`<option value=${item._id}>${item.name}</option>`))

  //Add default message
  output.unshift($(`<option selected disabled hidden>Select A ${type}</option>`))

  //Add Options to Select element
  select.append(output)
}
```

This function makes use of jQuery's ability to take an array of 'element' strings and append them to an element. I use the unshift array method to insert a default message into the top of the array of 'elements' before they are added to the DOM.


#### Express / Mongoose
I have created a few RESTful routes for the application even though all of the data could be retrieved simply from one call, and sorted on the front end, I imagined scaling the project so that there may be many suppliers with many products.

Requesting all of the data and then sifting through it on the client side would not be a good design choice as the server response time could be quite large.

Instead I break the application into sections and request the least amount of data I need to perform the current task.

1. Get list of suppliers with ```get('/api/suppliers')```
2. Get list of products for this supplier with ```get('/api/suppliers/:id')```
3. Get properties of selected product with ```get('/api/products/:id')```

This leads to more API requests, but each request returns a small amount of data as I only return relevant fields using mongoose.

```
function showRoute(req, res, next) {
  Supplier
    .findById(req.params.id)
    //Populate 'products' for supplier show, but show only name
    .populate({path: 'products', select: 'name'})
    .then(supplier => res.json(supplier))
    .catch(next)
}
```

This function in ```products.js``` uses the *select* property of the *populate* method to only return the name of the products, rather than all of their data, reducing the amount of data that needs to be transferred.

#### Mocha / Chai / supertest
The command ``` yarn test ``` will run the test suite.

I have created a few basic tests to show how they might look on a larger project.

Mocha is used as the test framework with Chai as the assertion library using Supertest which lets us perform tests on node servers.

For each test a new database is created each time so that the data used is known and consistent using the ```mock_data.js``` file.

I then test that data is returned in the correct type, then has the correct keys, and finally the correct data.

```
it('should return the correct data', done => {
  api
    .get(`/api/products/${_product.id}`)
    .end((err, res) => {
      expect(res.body.name).to.eq(productData[0].name)
      expect(res.body.price).to.eq(productData[0].price)
      expect(res.body.reference).to.eq(productData[0].reference)
      expect(res.body.supplier.name).to.eq(productData[0].supplier.name)
      done()
    })
})
```
This function from ``` products/show_spec.js ``` tests to make sure that the correct data is being returned from the API request.

#### Webpack

I have built this project using Webpack. This involved changing how jQuery and Bootstrap were used.

Initially they were installed locally and linked from the ```index.html``` file.

To use them with webpack they need to be handled differently.

In the ```webpack.config.js``` file we import jQuery as a plugin.

```
plugins: [
  ...
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]
```
I attempted to import Bootstrap into webpack as well, but could not get it working with in the timeframe that I had set for the task, so instead is linked externally using the official Bootstrap CDN, and the dashboard css file hosted locally as before.

```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<link href="css/dashboard.css" rel="stylesheet">
```

#### Future Features

1. Create Routes
  With more time, I could add the ability to add Suppliers and Products to the database. I would do this by build create routes and using Post requests from the front end to pass the data to the server.

  This would require building some sort of input interface on the front end, combining the data into an object and sending the data as a json file.

2. Search Bar
  It would be possible to create a search bar to search for Wongles. This could be done using search route which would query the database using the users text input. I have used the lodash debounce function to enable 'automatic' data entry in the past, so that the list of results would update as the user typed.

3. Improved Testing
  The current tests only test for good data. More tests would be needed to make sure that it was robust enough to withstand incorrect requests, etc.
