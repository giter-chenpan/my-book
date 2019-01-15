let mongoose = require('../db')
let ReplySchema = require('../schema/reply')

ReplySchema.statics.NewReply = function (data, callback) {
  this.create(data, err => {
    callback(err)
  })
}

let ReplyModel = mongoose.model('Reply', ReplySchema, 'reply')

module.exports = ReplyModel
