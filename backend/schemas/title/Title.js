let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TitleSchema = new Schema({
    title_uid: String,
    user_name: String,
    title_title: String,
    title_description: String,
    title_type: String,
    title_status: Number,
    title_time: Date,
    title_delete: Number,
    title_img: String,
    title_see: Number
})

module.exports = TitleSchema
