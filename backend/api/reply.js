let ReplyModel = require('../mongodb/model/reply')
let { getToken } = require('../utils/token')

module.exports = {
  NewReply () {
    return (req, res) => {
      let token = req.headers.tiancai9
      let data = req.body
      getToken(token)
        .then(msg => {
          if (msg.code !== 200) {
            res.send({ code: 400, data: '身份验证失效，请重新登入' })
            return
          }
          let userid = JSON.parse(msg.data).userid
          data['replyUser'] = userid
          ReplyModel.NewReply(data, err => {
            if (err) {
              res.send({ code: 400, data: '回复失败，请稍后再试！' })
              return
            }
            res.send({ code: 200, data: '恭喜您！回复成功' })
          })
        })
    }
  }
}
