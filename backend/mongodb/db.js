let mongoose = require('mongoose')
let config = require('../config')

mongoose.connect(config.mongodb, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('数据库链接成功')
})

module.exports = mongoose
