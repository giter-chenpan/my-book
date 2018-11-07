let mongoose = require('mongoose')
let TitleSchema = require('../schemas/title/Title')
let TitleModel = mongoose.model('title', TitleSchema)

module.exports = TitleModel
