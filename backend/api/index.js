module.exports = () => {
  return (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Origin,tiancai9')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    let whiteList = ['/api/findarticletype', '/api/onefindarticle', '/api/findarticle', '/api/loginuser', '/api/newuser', '/api/getimg', '/api/ifemail', '/api/loadimg']
    let url = req.originalUrl
    if (url.indexOf('?') !== -1) {
      url = url.substring(0, url.indexOf('?'))
    }
    if (whiteList.indexOf(url) === -1) {
      if (!req.headers.tiancai9) {
        res.send({ code: 400, data: '身份验证失效，请重新登入' })
        return
      }
    }
    next()
  }
}
