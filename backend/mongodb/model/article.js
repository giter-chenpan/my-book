let mongoose = require('../db')
let ArticleSchema = require('../schema/article')

ArticleSchema.statics.NewArticle = function (data, callback) {
  this.create(data, err => {
    callback(err)
  })
}
ArticleSchema.statics.FindArticle = function (pageNum, pageSize, data, callback) {
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
      skip: pageNum || 0,
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
ArticleSchema.statics.OneFindArticle = function (data, callback) {
  this.find(data, (err, docs) => {
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
