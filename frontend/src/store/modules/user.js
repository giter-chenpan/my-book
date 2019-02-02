import { RegisterUserAPI, LoginUserAPI } from '@/api/user'

const user = {
  state: {
    token: '',
    userid: '',
    username: '',
    userEmail: '',
    userImg: '',
    userRoot: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USEREMAIL: (state, userEmail) => {
      state.userEmail = userEmail
    },
    SET_USERIMG: (state, userImg) => {
      state.userImg = userImg
    },
    SET_USERROOT: (state, userRoot) => {
      state.userRoot = userRoot
    }
  },
  actions: {
    // 注册
    RegisterUser ({ commit }, registerInfo) {
      return new Promise((resolve) => {
        RegisterUserAPI(registerInfo)
          .then((res) => {
            resolve(res)
          })
      })
    },

    // 登入
    LoginUser ({ commit, state }, loginInfo) {
      return new Promise((resolve) => {
        LoginUserAPI(loginInfo)
          .then((res) => {
            let data = res.data
            commit('SET_TOKEN', data.token)
            commit('SET_USERID', data.data.userid)
            commit('SET_USERNAME', data.data.username)
            commit('SET_USERIMG', data.data.userImg)
            commit('SET_USERROOT', data.data.userRoot)
            commit('SET_USEREMAIL', data.data.userEmail)
            resolve(res)
          })
      })
    }
  }
}

export default user
