let express = require('express')
let app = express()
let config = require('./config') // 公共配置
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ // 解析post请求的中间件
  extended: true
}))
app.use(bodyParser.json()) // 解析json

let auth = require('./api')
app.use('*', auth())

// utils
let { toEmail, ifEmail } = require('./utils/Email')
app.post('/api/toemail', toEmail())
app.get('/api/ifemail', ifEmail())

let { NewUser, LoginUser, UpdatePwd } = require('./api/user')
// 用户
app.post('/api/newuser', NewUser())
app.post('/api/loginuser', LoginUser())
app.post('/api/updatepwd', UpdatePwd())

app.listen(config.port, () => {
  console.log('服务器启动成功')
})
