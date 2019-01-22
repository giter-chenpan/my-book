module.exports = () => {
  return (req, res, next) => {
    // console.log(req)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Origin,tiancai9token')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    // console.log('全局请求监听')
    next()
  }
}
