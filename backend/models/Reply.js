let mongoose = require('mongoose')
let ReplySchema = require('../schemas/reply/reply')
let ReplyModel = mongoose.model('replyt', ReplySchema)

module.exports = ReplyModel
