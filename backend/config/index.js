let config = {
  port: 3001,
  emailUrl: 'http://127.0.0.1:3001/api/ifemail',
  mongodb: 'mongodb://127.0.0.1:27017/myboot2',
  NewUser: false // 控制注册 true不让注册，false开启注册
}

module.exports = config
