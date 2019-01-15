let mongoose = require('../db')

let ReplySchema = mongoose.Schema({
    replyPid: String,
    replyContent: String,
    replyUser: String,
    replyUserTo: String,
    replyTime: {
        type: String,
        default: new Date()
    }
})

module.exports = ReplySchema
