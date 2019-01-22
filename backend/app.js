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

let { LoadIMG, GetImg } = require('./utils/IMG')
app.post('/api/loadimg', LoadIMG())
app.get('/api/getimg', GetImg())

// 用户
let { NewUser, LoginUser, UpdatePwd } = require('./api/user')
app.post('/api/newuser', NewUser())
app.post('/api/loginuser', LoginUser())
app.post('/api/updatepwd', UpdatePwd())

// 文章
let { NewArticle, UpdateArticle, FindArticle, OneFindArticle, FindArticleType } = require('./api/article')
app.post('/api/newarticle', NewArticle())
app.post('/api/updatearticle', UpdateArticle())
app.get('/api/findarticle', FindArticle())
app.get('/api/findarticletype', FindArticleType())
app.get('/api/onefindarticle', OneFindArticle())

// 评论
let { NewCommnet } = require('./api/comment')
app.post('/api/newcontent', NewCommnet())

// 回复
let { NewReply } = require('./api/reply')
app.post('/api/newreply', NewReply())

app.listen(config.port, () => {
  console.log('服务器启动成功')
})
