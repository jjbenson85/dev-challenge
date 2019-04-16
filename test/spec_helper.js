process.env.MONGODB_URI = 'mongodb://localhost/wongles'
process.env.PORT = 3000

global.Promise = require('bluebird')

const chai =require('chai')
global.expect = chai.expect

const supertest = require('supertest')
const app = require('../index')
global.api = supertest(app)
