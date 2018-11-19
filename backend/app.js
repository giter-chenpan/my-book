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
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Origin,tiancai9token');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });

// 图片上传
let { LoadIMG } = require('./utile/IMG')
app.post('/api/loadimg', (req, res) => {
    LoadIMG(req, (err, path) => {
        if (!err) {
            res.send({ code: 200, data: path })
        } else {
            res.send({ code: 400, data: err })
        }
    })
})
// 获取图片
let { GetImg } = require('./utile/IMG')
app.get('/api/getimg', (req, res) => {
    let imgString = req.query.img
    GetImg(imgString, (err, img) => {
        if (!err) {
            res.send(img)
        } else {
            res.send({ code: 400, data: err})
        }
    })
})

// 根据用户id获取图片
let { GetUserImgDao } = require('./dao/user')
app.get('/api/getuserimg', (req, res) => {
    var query = req.query
    console.log(res)
    console.log(query)
    GetUserImgDao(UserModel, query, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.send({ code: 200, data: docs})
        } else {
            res.send({ code: 400, data: err })
        }
    })
})

let UserModel = require('./models/user')
let { Findtoken } = require('./utile/token')
let { Updatetoken } = require('./utile/token')
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
                if (docs.length) {
                    res.send({code: 400, data:'该用户已被注册'})
                } else {
                    FindUserNameDao(UserModel, user, function (err, docs) {
                        if (!err) {
                            if (docs.length) {
                                res.send({ code: 400, data:'该名称已被使用' })
                            } else {
                                NewUserDao(UserModel, user, function (err) {
                                    if (!err) {
                                        res.send({ code: 200, data: 'OK' })
                                    } else {
                                        res.send({ code: 200, data: err })
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
        res.send({code: 400, data:'请填写完表单'})
    }
})

// 用户登录
let { LoginUserDao } = require('./dao/user')
app.post('/api/loginuser', (req, res) => {
    let user = req.body
    FindUserIdDao(UserModel, user, function(err, docs) {
        if (!err && docs.length > 0) {
            LoginUserDao(UserModel, user, function(err, docs) {
                if (!err) {
                    user["user_token"] = uuidv1()
                    Updatetoken(UserModel, user, (err, docs) => {
                        if (!err) {
                            res.send({ code: 200, token:user.user_token })
                        } else {
                            res.send({ code:400, data: '发生未知错误,获取token失败' })
                        }
                    })
                } else {
                    res.send({ code:400, data: '发生未知错误' })
                }
            })
        } else {
            res.send({ code:400, data: '未找到此用户' })
        }
    })
})

// 用户登出
let { LogoutUserDao } = require('./dao/user')
app.get('/api/userlogout', (req, res) => {
    let token = req.headers.tiancai9token
    LogoutUserDao(UserModel, { user_token: token }, (err, docs) => {
        if (!err) {
            if (docs.n == 1) {
                res.send({ code: 200, data: '登出成功' })
            } else {
                res.send({ code: 402, data: '身份验证失效，请重新登录' })
            }
        } else {
            console.log('登录失败' + err )
            res.send({ code:400, data: '登出失败，请稍后重试' })
        }
    })
})

let TitleModel = require('./models/title')
// 新增文章
let { NewTitleDao } =require('./dao/title')
app.post('/api/newtitle', (req, res) => {
    if (req.headers.tiancai9token) {
        let token = req.headers.tiancai9token
        let title = req.body
        Findtoken(UserModel, { user_token: token }, (err, docs) => {
            if (!err) {
                if (docs.length !== 0) {
                    title["user_id"] = docs[0].user_id
                    NewTitleDao(TitleModel, title, (err) => {
                        if (!err) {
                            res.send({ code: 200, data: '创建文章成功'})
                        } else {
                            console.log(err)
                            res.send({ code: 400, data: '创建文章失败'})
                        }
                    })
                } else {
                    res.send({ code: 402, data: '登录失效，请重新登录'})
                }
            } else {
                res.send(err)
            }
        })
    } else {
        res.send({code: 402, data: '登录失效，请重新登录'} )
    }
})

// 获取文章
let { FindTitleDao } = require('./dao/title')
let { SeeTitleDao } = require('./dao/title')
app.get('/api/findtitle', (req, res) => {
    let query = req.query
    FindTitleDao(TitleModel, query, (err, docs, page) => {
        if (!err) {
            SeeTitleDao(TitleModel, query)
            res.send({ code: 200, data: docs, total: page.total, currentPage: page.pageNum })
        } else {
            console.log('获取文章失败' + err)
            res.send(err)
        }
        
    })
})

// 修改文章
let { UpdateTitleDao } = require('./dao/title')
app.post('/api/updatetitle', (req, res) => {
    if (req.headers.tiancai9token) {
        let token = req.headers.tiancai9token
        Findtoken(UserModel, { user_token: token }, (err, docs) => {
            if (!err) {
                if (docs.length !== 0) {
                    let body = req.body
                    body["user_id"] = docs[0].user_id
                    UpdateTitleDao(TitleModel, body, (err, docs) => {
                        if (!err) {
                            if (docs.n == 1) {
                                res.send({ code: 200, data: '文章修改成功'})
                            } else {
                                res.send({ code:402, data: '身份认证失效，请重新登录' })
                            }
                        } else {
                            console.log('文章修改失败' + err)
                            res.send({ code: 400, data: '修改失败' })
                        }
                    })                    
                } else {
                    res.send({ code: 402, data: '登录失效，请重新登录' })
                }
            } else {
                res.send(err)
            }
        })
    } else {
        res.send({ code: 402, data: '登录失效，请重新登录' })
    }
})

// 删除文章
let { RemoveTitleDao } = require('./dao/title')
app.get('/api/removetitle', (req, res) => {
    let token = req.headers.tiancai9token
    Findtoken(UserModel, { user_token: token}, (err, docs) => {
        if (!err) {
            if (docs.length !== 0) {
                let query = req.query
                query["user_id"] = docs[0].user_id
                RemoveTitleDao(TitleModel, query, (err, docs) => {
                    if (!err) {
                        if (docs.n == 1) {
                            res.send({ code:200, data: '文章删除成功' })
                        } else {
                            res.send({ code:402, data: '身份认证失败,请重新登录' })
                        }
                    } else {
                        console.log('文章删除失败' + err)
                        res.send({ code:400, data: '删除失败' })
                    }
                })
            } else {
                res.send({ code: 402, data: '登录失效，请重新登录' })
            }
        } else {
            res.send(err)
        }
    })
})

let CommentsModel = require('./models/comments')
// 新增评论
let { NewCommentsDao } = require('./dao/comments')
app.post('/api/newcomments', (req, res) => {
    let token = req.headers.tiancai9token
    let body = req.body
    Findtoken(UserModel, { user_token: token }, (err, docs) => {
        if (!err) {
            if (docs.length !== 0) {
                body["user_id"] = docs[0].user_id
                NewCommentsDao(CommentsModel, body, (err) => {
                    if (!err) {
                        res.send({ code:200, data: '新增评论成功' })
                    } else {
                        console.log('新增评论失败' + err)
                        res.send({ code:400, data: '新增评论失败' })
                    }
                })
            } else {
                res.send({ code: 402, data: '登录失效，请重新登录' })
            }
        } else {
            console.log('新增评论失败' + err)
            res.send(err)
        }
    })
})
let ReplyModel = require('./models/Reply')
// 新增回复
let { NewReplyDao } = require('./dao/reply')
app.post('/api/newreply', (req, res) => {
    let body = req.body
    let token = req.headers.tiancai9token
    Findtoken(UserModel, { user_token: token }, (err, docs) => {
        if (!err) {
            if (docs.length !== 0) {
                body["reply_id"] = docs[0].user_id
                NewReplyDao(ReplyModel, body, (err) => {
                    if (!err) {
                        res.send({ code: 200, data: '回复成功' })
                    } else {
                        console.log('回复内容失败' + err )
                        res.send({ code: 402, data: '回复失败' })
                    }
                })
            } else {
                res.send({ code: 402, data: '身份验证失败，请重新登录' })
            }
        } else {
            res.send({ code: 402, data: '登录失效，请重新登录' })
        }
    })
})

// 获取评论和回复
let { FindCommentsDao } = require('./dao/comments')
let { FindReplyDao } = require('./dao/reply')
app.get('/api/findcomments', (req, res) => {
    let query = req.query
    // console.log(query)
    FindCommentsDao(CommentsModel, query, (err, docs) => {
        if (!err) {
            if (docs.length !== 0) {
                let commentsObj = docs
                let replyAry = []
                let commentsAry = []
                for (let i = 0; i < commentsObj.length; i++) {
                    FindReplyDao(ReplyModel, { comments_uid: commentsObj[i]._doc.comments_uid }, (err, docs) => {
                        if (!err) {
                            if (docs.length !== 0) {
                                for (let j = 0; j < docs.length;  j++) {
                                    replyAry.push(docs[j]._doc)
                                    if (j == docs.length - 1) {
                                        commentsObj[i]._doc["reply"] = replyAry
                                        replyAry = []
                                        commentsAry.push(commentsObj[i]._doc)
                                        // console.log(i)
                                        // if (i == commentsObj.length - 1) {
                                        //     res.send(commentsAry)
                                        // }
                                    }
                                }
                            } else {
                                if (i == commentsObj.length - 1) {
                                    console.log('获取评论失败' + err)
                                    res.send({ code: 400, data: '获取评论失败' })
                                }
                            }
                        } else {
                            if (i == commentsObj.length - 1) {
                                console.log('获取评论失败' + err)
                                res.send({ code: 400, data: '获取评论失败' })
                            }
                        }
                    })
                }
                setTimeout( function Res () {
                    res.send(commentsAry)
                }, 500)
            } else {
                res.send({ code: 400, data: '文章的评论为空' })
            }
        } else {
            console.log('获取评论失败' + err)
            res.send({ code:400, data:'获取评论失败' })
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