let jwt = require('jsonwebtoken')

let secretOrPrivateKey = 'tiancai9' // 这是加密的key（密钥）

module.exports = {
  /**
   * 获取token dataJson需为json字符串
   * @param {Json<String>}
   */
  setToken (dataJson) {
    let content = { msg: dataJson } // 要生成token的主题信息
    let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60 * 60 * 24 * 24 * 30 // 一个月后过期
    })
    return token
  },
  /**
   * 检测token
   * @return {Promise<obj>}
   */
  getToken (token) {
    let p = jwt.verify(token, secretOrPrivateKey, (err, decode) => {
      if (err) { //  时间失效的时候/ 伪造的token
        return new Promise((resolve, reject) => {
          resolve({ code: 400, data: err })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve({ code: 200, data: decode.msg })
        })
      }
    })
    return p
  }
}
