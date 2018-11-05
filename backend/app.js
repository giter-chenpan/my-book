let express = require('express')
let port = process.env.PORT || 3000
let mongoose = require('mongoose')
let app = express()

mongoose.connect('mongodb://127.0.0.1/mybook')

app.listen(port)

// post 前端
app.post('/api/getWeather', (req, res) => {
    console.log(req)
    console.log(res)
})