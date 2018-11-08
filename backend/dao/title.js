let uuidv1 = require('uuid/v1')
let myDate = new Date()

// 新增文章
exports.NewTitleDao = function (model, conditions, callback) {
    conditions["title_uid"] = uuidv1()
    conditions["title_status"] = 0
    conditions["title_time"] = myDate
    conditions["title_delete"] = 0
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
    if (conditions.pagenum) { var pagenum = conditions.pagenum }
    if (conditions.pageSize) { var pageSize = conditions.pageSize }
    delete conditions["pageSize"]
    delete conditions["pagenum"]
    model.find(conditions, {
        _id: 0,
        user_id: 1,
        title_title: 1,
        title_description: 1,
        title_type: 1,
        title_time: 1,
        title_status: 1
    }, {
        skip: pagenum,
        limit: pageSize,
        sort: { "_id": -1 }
    }, (err, docs) => {
        console.log(err)
        console.log(docs)
        callback(err, docs)
    })
}