module.exports = () => {
  return (req, res, next) => {
    // console.log('全局请求监听')
    next()
  }
}
