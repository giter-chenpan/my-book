let mongoose = require('mongoose')
let CitySchema = require('../schemas/user')
let City = mongoose.model('City', CitySchema)

module.exports = City
