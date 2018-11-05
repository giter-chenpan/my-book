let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CitySchema = new Schema({
    id: string,
    name: string
})

CitySchema.static = {
    fetch: (cb) => {
        return this
            .find({})
            .exec(cb)
        }
}

module.exports = CitySchema
