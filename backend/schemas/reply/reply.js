let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ReplySchema = new Schema({
    reply_uid: String,
    comments_uid: String,
    reply_content: String,
    reply_id: String,
    reply_toid: String,
    reply_time: Date
})

module.exports = ReplySchema
