let mongoose = require('mongoose')
let CommentsSchema = require('../schemas/comments/comments')
let CommentsModel = mongoose.model('comments', CommentsSchema)

module.exports = CommentsModel
