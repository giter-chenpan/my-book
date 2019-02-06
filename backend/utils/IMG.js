let formidable = require('formidable')
let uuidv1 = require('uuid/v1')
let fs = require('fs')
let path = require('path')
let userModel = require('../mongodb/model/user')
require('util')

module.exports = {
  LoadArticleIMG () {
    return (req, res) => {
      // 1.实例化对象
      let form = new formidable.IncomingForm()

      // 2.设置上传的文件路径
      form.uploadDir = 'img/uploads'

      // 3.获取表单的内容
      form.parse(req, (err, fields, files) => {
        if (!err && files.file && files.file.size < 4325900) {
          // 3.1生存随机的名称
          let name = uuidv1()

          // 3.2获取文件上传的后缀
          let extName = path.extname(files.file.name)

          // 3.3设置路径
          let oldPahtName = files.file.path.substring(files.file.path.indexOf('http/'), files.file.path.length)
          oldPahtName = __dirname.substring(0, __dirname.indexOf('utile')) + oldPahtName
          let oldPath = oldPahtName
          let newPathName = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\uploads\\' + name + extName
          let newPath = newPathName

          // 3.4改名
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              res.send({ code: 400, data: err })
              return
            }
            res.send({ code: 200, data: name + extName })
          })
        } else {
          res.send({ code: 400, data: '图片大于4MB' })
        }
      })
    }
  },
  LoadUserImg () {
    return (req, res) => {
      // 1.实例化对象
      let form = new formidable.IncomingForm()

      // 2.设置上传的文件路径
      form.uploadDir = 'img/userimg'

      // 3.获取表单的内容
      form.parse(req, (err, fields, files) => {
        if (!err && files.file && files.file.size < 4325900) {
          // 3.1生存随机的名称
          let name = uuidv1()

          // 3.2获取文件上传的后缀
          let extName = path.extname(files.file.name)

          // 3.3设置路径
          let oldPahtName = files.file.path.substring(files.file.path.indexOf('http/'), files.file.path.length)
          oldPahtName = __dirname.substring(0, __dirname.indexOf('utile')) + oldPahtName
          let oldPath = oldPahtName
          let newPathName = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\userimg\\' + name + extName
          let newPath = newPathName

          // 3.4改名
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              res.send({ code: 400, data: err })
              return
            }
            res.send({ code: 200, data: name + extName })
          })
        } else {
          res.send({ code: 400, data: '图片大于4MB' })
        }
      })
    }
  },
  GetImg () {
    return (req, res) => {
      let imgName = req.query.img
      let path = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\uploads\\' + imgName
      fs.readFile(path, (err, data) => {
        if (err) {
          res.send({ code: 400, data: err })
          return
        }
        res.send(data)
      })
    }
  },
  GetUserImg () {
    return (req, res) => {
      userModel.FindUser({ userid: req.query.userid }, (err, docs) => {
        if (err) {
          res.send({ code: 400, data: err })
          return
        }
        let imgName = docs[0].userImg
        let path = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\userimg\\' + imgName
        fs.readFile(path, (err, data) => {
          if (err) {
            res.send({ code: 400, data: err })
            return
          }
          res.send(data)
        })
      })
    }
  },
  /**
   * @param {富文本传入的json字符串} JsonString
   */
  addArticleImgOPEN (JsonString) {
    let json = JSON.parse(JsonString)
    function GetDescription (obj) {
      for (var i = 0; i < obj.length; i++) {
        var tag = obj[i].tag
        if (tag) {
          if (tag === 'img') {
            let attrs = obj[i].attrs
            for (let i = 0; i < attrs.length; i++) {
              if (attrs[i].name === 'src') {
                let imgText = attrs[i].value
                let jpgName = uuidv1()
                let pathName = './img/article/' + jpgName + '.png' // 从app.js级开始找--在我的项目工程里是这样的
                let base64 = imgText.replace(/^data:image\/\w+;base64,/, '') // 去掉图片base64码前面部分data:image/png;base64
                let dataBuffer = Buffer.from(base64, 'base64') // 把base64码转成buffer对象，
                fs.writeFileSync(pathName, dataBuffer)
                attrs[i].value = jpgName + '.png'
              }
            }
          }
          if (obj[i].attrs.length !== 0) {
            GetDescription(obj[i].children)
          } else {
            GetDescription(obj[i].children)
          }
        }
      }
      return obj
    }
    json = GetDescription(json)
    return json
  },
  GetArticleImg () {
    return (req, res) => {
      userModel.FindUser({ userid: req.query.userid }, (err, docs) => {
        if (err) {
          res.send({ code: 400, data: err })
          return
        }
        let imgName = docs[0].userImg
        let path = __dirname.substring(0, __dirname.indexOf('utile')) + 'img\\article\\' + imgName
        fs.readFile(path, (err, data) => {
          if (err) {
            res.send({ code: 400, data: err })
            return
          }
          res.send(data)
        })
      })
    }
  }
}
