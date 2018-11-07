exports.Findtoken = function (model, conditions, callback) {
    model.find(conditions, (err, docs) => {
        callback(err, docs)
    })
}

exports.Updatetoken = function (model, conditions, callback) {
    model.updateMany({ user_id: conditions.user_id }, {$set: {user_token: conditions.user_token}}, (err, docs) => {
        callback(err, docs)
    })
}