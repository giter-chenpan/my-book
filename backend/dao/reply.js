let uuidv1 = require('uuid/v1')
let myDate = new Date()

exports.NewReplyDao = function (model, conditions, callback) {
    conditions["reply_uid"] = uuidv1()
    conditions["reply_time"] = myDate
    
    model.create(conditions, (err) => {
        if (!err) {
            callback()
        } else {
            callback(err)
        }
    })
}

exports.FindReplyDao = function (model, conditions, callback) {
    model.find(conditions,{
        _id: 0,
        comments_uid: 1,
        reply_content: 1,
        reply_toid: 1,
        reply_id: 1,
        reply_time: 1
    },{
        sort: { "_id": -1 }
    }, (err, docs) => {
        callback(err, docs)
    })
}
