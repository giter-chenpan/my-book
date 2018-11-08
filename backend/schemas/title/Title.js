let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TitleSchema = new Schema({
    title_uid: String,
    user_id: String,
    title_title: String,
    title_description: String,
    title_type: String,
    title_status: Number,
    title_time: Date,
    title_delete: Number
})

module.exports = TitleSchema
