let { getToken } = require('../utils/token')
let { addArticleImgOPEN } = require('../utils/IMG')
let CommentModel = require('../mongodb/model/comment')

module.exports = {
  NewCommnet () {
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
          let commentPid = data._id
          let commentContent = addArticleImgOPEN(JSON.stringify(data.commentContent))
          let obj = {
            commentUser: userid,
            commentPid: commentPid,
            commentContent: commentContent
          }
          CommentModel.NewComment(obj, (err) => {
            if (err) {
              res.send({ code: 400, data: '评论失败，请刷新后试试' })
              return
            }
            res.send({ code: 200, data: '恭喜您！评论成功' })
          })
        })
    }
  }
}
