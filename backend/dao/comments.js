let uuidv1 = require('uuid/v1')
let myDate = new Date()

exports.NewComments = function (model, conditions, callback) {
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