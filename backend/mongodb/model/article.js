let mongoose = require('../db')
let ArticleSchema = require('../schema/article')
let CommentModel = require('../model/comment')
let ReplyModel = require('../model/reply')

// 创建文章
ArticleSchema.statics.NewArticle = function (data, callback) {
  this.create(data, err => {
    callback(err)
  })
}
// 获取文章列表
ArticleSchema.statics.FindArticle = function (pageNum, pageSize, data, callback) {
  if (data.articleType === undefined) {
    data = {}
  }
  this.countDocuments(data, (err, count) => {
    if (err) {
      callback(err)
      return
    }
    this.find(data, {
      _id: 1,
      articleTitle: 1,
      articleContent: 1,
      articleType: 1,
      articleImg: 1,
      articleUser: 1,
      articleSee: 1,
      articleCollect: 1,
      articleThumbs: 1,
      articleTime: 1
    }, {
      skip: (pageNum - 1) * pageSize || 0,
      limit: pageSize || 10,
      sort: { '_id': -1 }
    }, (err, docs) => {
      let total = {
        count: count || 1,
        pageNum: pageNum || 1
      }
      callback(err, docs, total)
    })
  })
}
// 获取文章
ArticleSchema.statics.OneFindArticle = function (pageNum, pageSize, data, callback) {
  this.find(data, (err, docs) => {
    if (err || docs.length === 0) {
      callback(err, '该文章消失异次元了')
      return
    }
    return new Promise((resolve, reject) => {
      resolve(docs)
    })
  })
    .then((msg) => {
      let ArticleAry = msg[0]
      let id = msg[0].id
      // 获取评论表
      CommentModel.find({ commentPid: id }, {
        commentPid: 1,
        commentContent: 1,
        commentUser: 1,
        commentFloor: 1,
        commentThumbs: 1,
        commentTime: 1
      }, {
        skip: (pageNum - 1) * pageSize || 0,
        limit: pageSize || 10,
        sort: { '_id': -1 }
      }, (err, docs) => {
        if (err || docs.length === 0) {
          callback(err, ArticleAry)
          return
        }
        ArticleAry._doc.comment = docs
        return new Promise((resolve, reject) => {
          resolve(ArticleAry)
          reject(err)
        }).catch((err) => {
          callback(err, '遇见未知错误')
        })
          .then((msg) => {
            let CommentList = msg._doc.comment
            // 获取页数
            CommentModel.countDocuments({ commentPid: id }, (err, count) => {
              if (err) {
                callback(err, '遇见未知错误')
                return
              }
              return new Promise((resolve, reject) => {
                resolve(count)
                reject(err)
              })
                .then(async (count) => {
                  // 循环获取回复表
                  for (let i = 0; i < CommentList.length; i++) {
                    await new Promise((resolve, reject) => {
                      ReplyModel.find({ replyPid: CommentList[i].id }, (err, docs) => {
                        CommentList[i]._doc.reply = docs
                        resolve(err, CommentList)
                      })
                    })
                  }
                  ArticleAry._doc.comment = CommentList
                  let total = {
                    count: count || 1,
                    pageNum: pageNum || 1
                  }
                  callback(null, ArticleAry, total)
                })
            })
          })
      })
    })
}
// 获取文章分类数组
ArticleSchema.statics.FindArticleType = function (callback) {
  this.find({}, ['articleType'], (err, docs) => {
    callback(err, docs)
  })
}
/**
 * data: 锁定要更新的数据,
 * makedata: 更新的数据
 */
ArticleSchema.statics.UpdateArticle = function (data, makedata, callback) {
  this.updateOne(data, {
    $set: makedata
  }, (err, docs) => {
    callback(err, docs)
  })
}

let ArticleModel = mongoose.model('Article', ArticleSchema, 'article')

module.exports = ArticleModel
