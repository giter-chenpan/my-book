let uuidv1 = require('uuid/v1')
let myDate = new Date()

// 注册
exports.NewUserDao = function (model, conditions, callback) {
    conditions["user_uid"] = uuidv1()
    conditions["user_time"] = myDate
    conditions["user_notice"] = 0
    conditions["user_role"] = 0
        model.create(conditions, (err, res) => {
        if (!err) {
            console.log('注册用户成功')
            callback()
        } else {
            console.log('注册用户失败')
            callback(err)
        }
    })
}

// 注册id效验
exports.FindUserIdDao = function (model, conditions, callback) {
    model.find({ "user_id": conditions.user_id }, (err, docs) => {
        if (!err) {
            callback(err,docs)
        } else {
            callback(err,docs)
        }
    })
}

// 注册名称效验
exports.FindUserNameDao = function (model, conditions, callback) {
    model.find({ "user_name": conditions.user_name }, (err, docs) => {
        if (!err) {
            callback(err,docs)
        } else {
            callback(err,docs)
        }
    })
}