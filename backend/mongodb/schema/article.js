let mongoose = require('../db')

let ArticleSchema = mongoose.Schema({
  articleUid: String,
  articleTitle: String,
  articleContent: String,
  articleType: String,
  articleImg: String,
  articleUser: String,
  articleSee: {
    type: Number,
    default: 0
  },
  articleCollect: {
    type: Number,
    default: 0
  },
  articleThumbs: {
    type: Number,
    default: 0
  },
  articleTime: {
    type: Date,
    default: new Date()
  }
})

module.exports = ArticleSchema
