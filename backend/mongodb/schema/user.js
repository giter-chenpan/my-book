let mongoose = require('../db')

let UserSchema = mongoose.Schema({
  userid: String,
  username: String,
  userImg: {
    type: String,
    default: 'status.jpg'
  },
  userEmail: String,
  userFensi: {
    type: Array,
    default: []
  },
  userGuanZhu: {
    type: Array,
    default: []
  },
  userCollect: {
    type: Array,
    default: []
  },
  userHistory: {
    type: Array,
    default: []
  },
  userQQ: {
    type: Number,
    default: '0'
  },
  userTongZhi: {
    type: Array,
    default: []
  },
  userRoot: {
    type: Number,
    default: 1
  },
  userStatus: {
    type: Number,
    default: 0
  },
  userTime: {
    type: Date,
    default: new Date()
  },
  userpwd: {
    type: Number,
    default: 1
  }
})

module.exports = UserSchema
