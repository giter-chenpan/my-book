import { RegisterUserAPI } from '@/api/user'

const user = {
  state: {
    userid: '',
    username: '',
    userEmail: ''
  },
  mutations: {
    SET_USERID: (state, userid) => {
      state.userid = userid
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USEREMAIL: (state, userEmail) => {
      state.userEmail = userEmail
    }
  },
  actions: {
    // 注册
    RegisterUser ({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        RegisterUserAPI(loginInfo)
          .then((res) => {
            commit('SET_USEREMAIL', loginInfo.userEmail)
            commit('SET_USERNAME', loginInfo.username)
            resolve(res)
          })
      })
    }
  }
}

export default user
