let email = require('emailjs')
let { getToken } = require('./token')
let userModel = require('../mongodb/model/user')
let { genSign, deSign } = require('./hash')
let config = require('../config')
let server = email.server.connect({
  user: '1169866725@qq.com', // 你的QQ用户
  password: 'uccwsqxgssqkbafd', // 注意，不是QQ密码，而是生成的授权码
  host: 'smtp.qq.com', // 主机，不改
  ssl: true // 使用ssl
})

module.exports = {
  toEmail () {
    return (req, res) => {
      if (req.headers.tiancai9) {
        getToken(req.headers.tiancai9)
          .then(msg => {
            if (msg.code === 200) {
              let data = JSON.parse(msg.data)
              userModel.FindUser(data, (err, docs) => {
                if (err || typeof docs === 'string') {
                  res.send({ code: 400, data: docs })
                  return
                }
                let userid = docs[0]._doc.userid
                let userEmail = docs[0]._doc.userEmail
                let text = genSign(userid)
                // 开始发送邮件
                server.send({
                  text: config.emailUrl + '?email=' + text + '，请点开此链接激活邮件，如不是本人操作，请勿打开', // 邮件内容
                  from: '1169866725@qq.com', // 谁发送的
                  to: userEmail, // 发送给谁的
                  subject: '这是一封来自tiancai⑨博客的验证信息' // 邮件主题
                }, err => {
                  if (err) {
                    res.send({ code: 400, data: '邮件发送失败，请重新发送' })
                    return
                  }
                  res.send({ code: 200, data: '邮件发送成功，请前往邮箱激活' })
                })
              })
            } else {
              res.send({ code: 400, data: 'token失效，请重新登入' })
            }
          })
      }
    }
  },
  ifEmail () {
    return (req, res) => {
      if (!req.query.email) {
        res.send({ code: 400, data: '别乱连别人接口(〃＞皿＜)' })
        return
      }
      let data = req.query.email
      data = deSign(data)
      console.log(data)
      userModel.UpdateUser({ userid: data }, { userStatus: 1 }, (err, docs) => {
        if (err) {
          res.send({ code: 400, data: '激活邮件失败，请重新发送邮件激活' })
          return
        }
        res.send({ code: 200, data: '激活邮件成功' })
      })
    }
  }
}
