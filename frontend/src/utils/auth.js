let Token = 'tiancai9'

module.exports = {
  getToken () {
    return localStorage.getItem(Token)
  },
  setToken (token) {
    localStorage.setItem(Token, token)
  },
  removeToken () {
    localStorage.removeItem(Token)
  }
}
