let mongoose = require('../db')
let CommentSchema = require('../schema/comment')

CommentSchema.statics.NewComment = function (data, callback) {
  this.find({ commentPid: data.commentPid }, {
    sort: [['_id', -1]]
  }, (err, docs) => {
    if (err) {
      callback(err)
      return
    }
    let commentFloor = docs.length + 1
    data['commentFloor'] = commentFloor
    this.create(data, err => {
      callback(err)
    })
  })
}

let CommentModel = mongoose.model('Comment', CommentSchema, 'comment')

module.exports = CommentModel
