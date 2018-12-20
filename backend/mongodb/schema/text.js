let mongoose = require('../db')

let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: {
    type: Number,
    default: 1
  }
})

let UserModel = mongoose.model('User', UserSchema, 'user')

module.exports = UserModel
