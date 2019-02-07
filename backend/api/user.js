let userModel = require('../mongodb/model/user')
let config = require('../config')
let { setToken, getToken } = require('../utils/token')

module.exports = {
  // 注册用户
  NewUser () {
    return (req, res) => {
      let data = req.body
      userModel.NewUser(data, (err, docs) => {
        if (err || docs || config.NewUser) {
          if (err) { console.log(err + '注册用户报错') }
          res.send({ code: 400, data: docs })
          return
        }
        res.send({ code: 200, data: '注册成功' })
      })
    }
  },
  // 登录
  LoginUser () {
    return (req, res) => {
      let data = req.body
      let dataJson = JSON.stringify({ userid: data.userid })
      userModel.LoginUser(data, (err, docs) => {
        if (err || typeof docs === 'string') {
          res.send({ code: 400, data: docs })
          return
        }
        let EmailStatus = docs[0]._doc.userStatus
        let userStar = docs[0]._doc
        let user = {
          userid: userStar.userid,
          username: userStar.username,
          userImg: userStar.userImg,
          userRoot: userStar.userRoot,
          userEmail: userStar.userEmail
        }
        if (EmailStatus === 0) {
          res.send({ code: 401, data: user, token: setToken(dataJson) })
          return
        }
        res.send({ code: 200, data: user, token: setToken(dataJson) })
      })
    }
  },
  // 根据用户id返回用户昵称
  getUserName () {
    return (req, res) => {
      let userid = req.query.userid
      userModel.FindUser({ userid: userid }, (err, docs) => {
        if (err) {
          res.send({ code: 400, data: userid })
          return
        }
        let username = docs[0]._doc.username
        res.send({ code: 200, data: username })
      })
    }
  },
  // 获取用户信息
  getUser () {
    return (req, res) => {
      let token = req.headers.tiancai9
      getToken(token)
        .then(msg => {
          if (msg.code !== 200) {
            res.send({ code: 400, data: '身份验证失效，请重新登入' })
            return
          }
          let user = JSON.parse(msg.data)
          userModel.FindUser(user, (err, docs) => {
            if (err) {
              res.send({ code: 400, data: err })
              return
            }
            let data = docs[0]._doc
            let userOBJ = {
              userEmail: data.userEmail,
              userid: data.userid,
              username: data.username,
              userRoot: data.userRoot,
              userImg: data.userImg,
              userCollect: data.userCollect,
              userFensi: data.userFensi,
              userGuanZhu: data.userGuanZhu,
              userStatus: data.userStatus,
              userTongZhi: data.userTongZhi,
              userHistory: data.userHistory
            }
            res.send({ code: 200, data: userOBJ })
          })
        })
    }
  },
  // 修改密码
  UpdatePwd () {
    return (req, res) => {
      let data = req.body
      let token = req.headers.ticani9
      getToken(token)
        .then(msg => {
          if (msg.code !== 200) {
            res.send({ code: 400, data: '身份验证失效，请重新登入' })
            return
          }
          let user = JSON.parse(msg.data)
          userModel.UpdateUser({ userid: user.userid }, { userpwd: data.updatepwd }, (err) => {
            if (err) {
              res.send({ code: 400, data: '修改密码失败，请重试' })
              return
            }
            res.send({ code: 200, data: '恭喜您！修改密码成功' })
          })
        })
    }
  }
}
