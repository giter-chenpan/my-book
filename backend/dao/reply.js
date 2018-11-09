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