let mongoose = require('../db')
let UserSchema = require('../schema/user')

UserSchema.statics.NewUser = function (data, callback) {
  this.find({ userid: data.userid }, (err, docs) => {
    if (docs.length !== 0) {
      callback(err, '该用户名已被使用')
      return
    }
    this.find({ username: data.username }, (err, docs) => {
      if (docs.length !== 0) {
        callback(err, '该昵称已被使用')
        return
      }
      this.create(data, (err) => {
        callback(err)
      })
    })
  })
}

UserSchema.statics.LoginUser = function (data, callback) {
  this.find({ userid: data.userid }, (err, docs) => {
    if (docs.length === 0) {
      callback(err, '没有找到该用户')
      return
    }
    this.find({ userpwd: data.userpwd, userid: data.userid }, (err, docs) => {
      if (err || docs.length === 0) {
        callback(err, '密码错误')
        return
      }
      callback(err, docs)
    })
  })
}

UserSchema.statics.FindUser = function (data, callback) {
  this.find(data, (err, docs) => {
    if (err || docs.length === 0) {
      callback(err, 'token失效，请重新登录')
      return
    }
    callback(err, docs)
  })
}
/**
 * data 为锁定要修改用户的数据
 * makedata 为需要修改的数据
 * @param {data<Obj>, makedata<Obj>}
 */
UserSchema.statics.UpdateUser = function (data, makedata, callback) {
  this.updateOne(data,
    { $set: makedata },
    (err, docs) => {
      callback(err, docs)
    })
}

let userModel = mongoose.model('User', UserSchema, 'user')

module.exports = userModel
