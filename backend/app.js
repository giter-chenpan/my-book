let express = require('express')
let config = require('./bind/config')
let port = config.port || 3000
let mongoose = require('mongoose')
var bodyParser = require('body-parser')
let uuidv1 = require('uuid/v1')
let app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1/mybook', { useNewUrlParser:true }, (err) => {
    if (!err) {
        console.log('数据库连接成功')
    } else {
        throw err
    }
})

let UserModel = require('./models/user')
let { Updatetoken } =require('./utile//token')
// 新建用户
let { NewUserDao } = require('./dao/user')
let { FindUserIdDao } = require('./dao/user')
let { FindUserNameDao } =require('./dao/user')
// json格式不能拥有空格与单引号
app.post('/api/newuser', (req, res) => {
    let user = req.body
    if (user && user.user_id.length > 5 && user.user_password.length > 5 && user.user_name.length > 1) {
        // 注册
        FindUserIdDao(UserModel, user, function (err, docs) {
            if (!err) {
                if (docs.length !== 0) {
                    res.send('该用户id已被注册')
                } else {
                    FindUserNameDao(UserModel, user, function (err, docs) {
                        if (!err) {
                            if (docs.length !== 0) {
                                res.send('该名称已被使用')
                            } else {
                                NewUserDao(UserModel, user, function (err) {
                                    if (!err) {
                                        res.send({ code: 200, data: 'OK'})
                                    } else {
                                        res.send(err)
                                    }
                                })
                            }
                        } else {
                            res.send(err)
                        }
                    })
                }
            } else {
                res.send(err)
            }
        })
    } else {
        res.send('参数不能为空')
    }
})

// 用户登录
let { LoginUserDao } = require('./dao/user')
app.post('/api/loginuser', (req, res) => {
    let user = req.body
    FindUserIdDao(UserModel, user, function(err, docs) {
        if (!err) {
            LoginUserDao(UserModel, user, function(err, docs) {
                if (!err) {
                    user["user_token"] = uuidv1()
                    Updatetoken(UserModel, user, (err, docs) => {
                        if (!err) {
                            res.send({ code: 200, token:user.user_token })
                        } else {
                            res.send(err)
                        }
                    })
                } else {
                    res.send(err)
                }
            })
        } else {
            res.send(err)
        }
    })
})

app.listen(port, (err) => {
    if (!err) {
        console.log('服务器的端口为：' + port)
        console.log('服务器启动成功')
    } else {
        throw err
    }
})