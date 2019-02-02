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
          userRoot: userStar.userRoot
        }
        if (EmailStatus === 0) {
          res.send({ code: 401, data: user, token: setToken(dataJson) })
          return
        }
        res.send({ code: 200, data: user, token: setToken(dataJson) })
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
