let uuidv1 = require('uuid/v1')
let myDate = new Date()

// 新增文章
exports.NewTitleDao = function (model, conditions, callback) {
    conditions["title_uid"] = uuidv1()
    conditions["title_status"] = 0
    conditions["title_time"] = myDate
    conditions["title_delete"] = 0
    conditions["title_see"] = 0
    model.create(conditions, (err) => {
        if (!err) {
            callback()
        } else {
            callback(err)
        }
    })
}

// 查找文章
exports.FindTitleDao = function (model, conditions, callback) {
    let pageNums = conditions.pageNum
    let pageNum = (conditions.pageNum - 1) * conditions.pageSize
    delete conditions["pageSize"]
    delete conditions["pageNum"]
    conditions.title_type = decodeURIComponent(conditions.title_type)
    if (conditions.title_type == 'undefined') {
        delete conditions["title_type"]
    }
    model.countDocuments(conditions, (err, count) => {
        if (!err) {
            model.find(conditions, {
                _id: 0,
                user_name: 1,
                title_uid: 1,
                title_title: 1,
                title_description: 1,
                title_type: 1,
                title_time: 1,
                title_status: 1,
                title_img: 1,
                title_see: 1
            }, {
                skip:  pageNum || 0,
                limit: conditions.pageSize || 10,
                sort: { "_id": -1 }
            }, (err, docs) => {
                callback(err, docs, { total: count, pageNum: Number(pageNums) })
            })           
        } else {
            callback(err)
        }
    })
}

// 修改文章
exports.UpdateTitleDao = function (model, conditions, callback) {
    let title_uid = conditions.title_uid
    let user_id = conditions.user_id
    conditions["title_time"] = myDate
    delete conditions["title_uid"]
    delete conditions["user_id"]
    model.updateMany({ title_uid: title_uid, user_id: user_id }, { $set: conditions }, (err, docs) => {
        callback(err,docs)
    })
}

// 删除文章
exports.RemoveTitleDao = function (model, conditions, callback) {
    console.log(conditions)
    model.deleteMany({ title_uid: conditions.title_uid, user_id: conditions.user_id }, (err, docs) => {
        callback(err,docs)
    })
}

// 文章阅读量增加
exports.SeeTitleDao = function (model, conditions, callback) {
    model.updateMany(conditions, { $inc: { title_see: 1 } }, (err, docs) => {
    
    })
}

