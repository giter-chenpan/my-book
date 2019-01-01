let ArticleModel = require('../mongodb/model/article')
let { getToken } = require('../utils/token')

module.exports = {
  NewArticle () {
    return (req, res) => {
      if (!req.headers.tiancai9) {
        res.send({ code: 400, data: '身份验证失效，请重新登录' })
        return
      }
      let data = req.body
      let token = req.headers.tiancai9
      getToken(token)
        .then(msg => {
          if (msg.code !== 200) {
            res.send({ code: 400, data: '身份验证失效，请重新登录' })
            return
          }
          let user = JSON.parse(msg.data)
          data['articleUser'] = user.userid
          ArticleModel.NewArticle(data, err => {
            if (err) {
              res.send({ code: 400, data: '创建文章失败，请稍后重试' })
              return
            }
            res.send({ code: 200, data: '创建文章成功' })
          })
        })
    }
  },
  UpdateArticle () {
    return (req, res) => {
      if (!req.headers.tiancai9) {
        res.send({ code: 400, data: '身份验证失效，请重新登录' })
        return
      }
      let token = req.headers.tiancai9
      let data = req.body
      getToken(token)
        .then(msg => {
          if (msg.code !== 200) {
            res.send({ code: 200, data: '身份验证失效，请重新登录' })
          }
          let user = JSON.parse(msg.data)
          let articleUid = {
            articleUser: user.userid,
            articleUid: data.articleUid
          }
          ArticleModel.UpdateArticle(articleUid, data, (err, docs) => {
            if (err || docs.n === 0) {
              res.send({ code: 400, data: '修改文章失败，请稍后重试' })
              return
            }
            res.send({ code: 200, data: '恭喜您！修改文章成功' })
          })
        })
    }
  },
  FindArticle () {
    return (req, res) => {
      let pageNum = req.query.pageNum
      let pageSize = req.query.pageSize
      if (typeof pageNum === 'string' || typeof pageSize === 'string') {
        res.send({ code: 400, data: '请传入Number类型的数据' })
        return
      }
      ArticleModel.FindArticle(pageNum, pageSize, null, (err, docs, total) => {
        if (err) {
          res.send({ code: 400, data: '获取列表失败' })
          return
        }
        res.send({ code: 200, data: docs, total: total })
      })
    }
  },
  OneFindArticle () {
    return (req, res) => {
      let data = req.query
      ArticleModel.OneFindArticle(data, (err, docs) => {
        if (err || docs.length === 0) {
          res.send({ code: 400, data: '这篇文章可能消失在某个次元了' })
          return
        }
        res.send({ code: 200, data: docs })
      })
    }
  }
}
