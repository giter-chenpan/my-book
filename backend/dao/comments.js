let uuidv1 = require('uuid/v1')
let myDate = new Date()

exports.NewCommentsDao = function (model, conditions, callback) {
    conditions["comments_uid"] = uuidv1()
    conditions["comments_time"] = myDate
    conditions["comments_delete"] = 0
    conditions["comments_status"] = 0
    model.create(conditions, (err) => {
        if (!err) {
            callback()
        } else {
            callback(err)
        }
    })
}

exports.FindCommentsDao = function (model, conditions, callback) {
    model.find({
        title_uid: conditions.title_uid
    }, {
        title_uid: 1,
        comments_content: 1,
        user_id: 1,
        comments_uid: 1,
        comments_time: 1,
        comments_status: 1,
        _id: 0
    }, {
        skip: (conditions.pageNum - 1)*conditions.pageSize || (1-1)*1,
        limit: conditions.pageSize || 10,
        sort: { "_id": -1 }
    }, (err, docs) => {
        callback(err, docs)
    })
}
