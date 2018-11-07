let mongoose = require('mongoose')
let UserSchema = require('../schemas/user/User')
let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
