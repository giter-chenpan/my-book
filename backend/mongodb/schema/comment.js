let mongoose = require('../db')

let CommentSchema = mongoose.Schema({
  commentPid: String,
  commentContent: String,
  commentUser: String,
  commentFloor: {
    type: Number
  },
  commentThumbs: {
    type: Number,
    default: 0
  },
  commentTime: {
    type: Date,
    default: new Date()
  }
})

module.exports = CommentSchema
