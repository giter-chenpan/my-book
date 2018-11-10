let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommentsSchema = new Schema({
    comments_uid: String,
    title_uid: String,
    comments_content: String,
    user_id: String,
    comments_status: Number,
    comments_time: Date,
    comments_delete: Number
})

module.exports = CommentsSchema
