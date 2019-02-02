let ArticleModel = require('../mongodb/model/article')
let { getToken } = require('../utils/token')

module.exports = {
  NewArticle () {
    return (req, res) => {
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
      let type = req.query.articleType
      pageNum = Number(pageNum)
      pageSize = Number(pageSize)
      ArticleModel.FindArticle(pageNum, pageSize, { articleType: type }, (err, docs, total) => {
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
      let pageNum = data.pageNum
      let pageSize = data.pageSize
      ArticleModel.OneFindArticle(pageNum, pageSize, { _id: data._id }, (err, docs, total) => {
        if (err || docs.length === 0 || typeof docs === 'string') {
          res.send({ code: 400, data: docs, total: total })
          return
        }
        res.send({ code: 200, data: docs, total: total })
      })
    }
  },
  FindArticleType () {
    return (req, res) => {
      ArticleModel.FindArticleType((err, docs) => {
        if (err) {
          res.send({ code: 400, data: err })
          return
        }
        let typeList = []
        for (let i = 0; i < docs.length; i++) {
          typeList.push(docs[i].articleType)
        }
        // 数组去重
        let newTypeList = [{ type: typeList[0], Number: 0 }]
        for (let i = 0; i < typeList.length; i++) {
          let flag = false
          for (let j = 0; j < newTypeList.length; j++) {
            if (typeList[i] === newTypeList[j].type) {
              for (let k = 0; k < newTypeList.length; k++) {
                if (newTypeList[k].type === typeList[i]) {
                  newTypeList[k].Number = newTypeList[k].Number + 1
                }
              }
              flag = true
            }
          }
          if (!flag) {
            newTypeList.push({ type: typeList[i], Number: 1 })
          }
        }
        let temp
        // 根据数据的数量冒泡排序
        for (let i = 0; i < newTypeList.length - 1; i++) {
          for (let j = 0; j < newTypeList.length - 1 - i; j++) {
            if (newTypeList[j].Number < newTypeList[j + 1].Number) {
              temp = newTypeList[j]
              newTypeList[j] = newTypeList[j + 1]
              newTypeList[j + 1] = temp
            }
          }
        }
        res.send({ code: 200, data: newTypeList })
      })
    }
  }
}
