let mongoose = require('mongoose')
let CommentsSchema = require('../schemas/comments/comments')
let CommentsModel = mongoose.model('comment', CommentsSchema)

module.exports = CommentsModel
