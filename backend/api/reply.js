module.exports = {
  NewReply () {
    return (req, res) => {
      console.log(req)
      let data = req.body
      console.log(data)
    }
  }
}
