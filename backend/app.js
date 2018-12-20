let express = require('express')
let app = express()
let config = require('./config') // 公共配置

let textModule = require('./mongodb/schema/text')
textModule.find({}, (err, docs) => {
  console.log('查询成功')
})

let auth = require('./api')
app.use('*', auth())

app.listen(config.port, () => {
  console.log('服务器启动成功')
})
