let formidable = require('formidable')
let util = require('util')
let uuidv1 = require('uuid/v1')
let fs = require('fs')
let path = require('path')

exports.LoadIMG = function (req, callback) {
    // 1.实例化对象
    var form = new formidable.IncomingForm();

    // 2.设置上传的文件路径
    form.uploadDir = 'img/uploads'
    
    // 3.获取表单的内容
    form.parse(req, (err, fields, files) => {
        if (!err && files.file && files.file.size < 4194304 ) {
            // 3.1生存随机的名称
            let name = uuidv1()
            
            // 3.2获取文件上传的后缀
            let extName = path.extname(files.file.name)

            // 3.3设置路径
            let oldPahtName = files.file.path.substring(files.file.path.indexOf('http/'), files.file.path.length)
                oldPahtName = __dirname.substring(0, __dirname.indexOf('utile')) + oldPahtName
            let oldPath = oldPahtName;
            let newPathName = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\uploads\\' + name + extName
            let newPath = newPathName
            
            // 3.4改名
            fs.rename(oldPath, newPath, (err) => {
                callback(err, name + extName)
            })
        } else {
            callback('图片大于4MB')
        }
        return
    })
}

exports.GetImg = function (conditions, callback) {
    let path = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\uploads\\' + conditions
    fs.readFile(path, (err, data) => {
        callback(err, data)
    })
}