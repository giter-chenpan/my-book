let express = require('express')
let app = express()
let config = require('./config') // 公共配置
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ // 解析post请求的中间件
  limit: '50mb',
  extended: true
}))
app.use(bodyParser.json({ limit: '50mb' })) // 解析json

let auth = require('./api')
app.use('*', auth())

// utils
let { toEmail, ifEmail } = require('./utils/Email')
app.post('/api/toemail', toEmail())
app.get('/api/ifemail', ifEmail())

let { LoadArticleIMG, GetImg, LoadUserImg, GetUserImg, GetArticleImg } = require('./utils/IMG')
app.post('/api/loadimg', LoadArticleIMG()) // 上传文章封面图
app.get('/api/getimg', GetImg()) // 得到文章封面图
app.post('/api/loaduserimg', LoadUserImg()) // 上传用户头像
app.get('/api/getuserimg', GetUserImg()) // 得到用户头像
app.get('/api/getarticleimg', GetArticleImg())

// 用户
let { NewUser, LoginUser, UpdatePwd, getUser, getUserName } = require('./api/user')
app.post('/api/newuser', NewUser())
app.post('/api/loginuser', LoginUser())
app.post('/api/updatepwd', UpdatePwd())
app.post('/api/getuser', getUser())
app.get('/api/getusername', getUserName())

// 文章
let { NewArticle, UpdateArticle, FindArticle, OneFindArticle, FindArticleType, SeeArticle } = require('./api/article')
app.post('/api/newarticle', NewArticle())
app.post('/api/updatearticle', UpdateArticle())
app.get('/api/findarticle', FindArticle())
app.get('/api/findarticletype', FindArticleType())
app.get('/api/onefindarticle', OneFindArticle())
app.post('/api/seearticle', SeeArticle())

// 评论
let { NewCommnet } = require('./api/comment')
app.post('/api/newcontent', NewCommnet())

// 回复
let { NewReply } = require('./api/reply')
app.post('/api/newreply', NewReply())

app.listen(config.port, () => {
  console.log('服务器启动成功')
})
