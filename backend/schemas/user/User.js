let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    user_uid: String,
    user_id: String,
    user_img: String,
    user_name: String,
    user_password: String,
    user_time: Date,
    user_notice: Number,
    user_role: Number,
    user_token: String
})

module.exports = UserSchema
