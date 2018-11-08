let uuidv1 = require('uuid/v1')
let myDate = new Date()

// 新增文章
exports.NewTitleDao = function (model, conditions, callback) {
    conditions["title_uid"] = uuidv1()
    conditions["title_status"] = 0
    conditions["title_time"] = myDate
    conditions["title_delete"] = 0
    console.log(conditions)
    model.create(conditions, (err) => {
        if (!err) {
            callback()
        } else {
            callback(err)
        }
    })
}