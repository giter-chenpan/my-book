import { RegisterUserAPI, LoginUserAPI, getUserAPI } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userid: '',
    username: '',
    userEmail: '',
    userImg: '',
    userRoot: '',
    userCollect: '',
    userFensi: '',
    userGuanZhu: '',
    userStatus: '',
    userTongZhi: '',
    userHistory: ''
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
    },
    SET_USERCOLLECT: (state, userCollect) => {
      state.userCollect = userCollect
    },
    SET_USERFENSI: (state, userFensi) => {
      state.userFensi = userFensi
    },
    SET_USERGUANZHU: (state, userGuanZhu) => {
      state.userGuanZhu = userGuanZhu
    },
    SET_USERSTATUS: (state, userStatus) => {
      state.userStatus = userStatus
    },
    SET_USERTONGZHI: (state, userTongZhi) => {
      state.userTongZhi = userTongZhi
    },
    SET_USERHISTORY: (state, userHistory) => {
      state.userHistory = userHistory
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
    LoginUser ({ commit }, loginInfo) {
      return new Promise((resolve) => {
        LoginUserAPI(loginInfo)
          .then((res) => {
            let data = res.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve(res)
          })
      })
    },

    // 获得用户信息
    GetUser ({ commit }) {
      return new Promise((resolve) => {
        getUserAPI()
          .then((res) => {
            let data = res.data
            commit('SET_USERID', data.data.userid)
            commit('SET_USERNAME', data.data.username)
            commit('SET_USERIMG', data.data.userImg)
            commit('SET_USEREMAIL', data.data.userEmail)
            commit('SET_USERROOT', data.data.userRoot)
            commit('SET_USERCOLLECT', data.data.userCollect)
            commit('SET_USERFENSI', data.data.userFensi)
            commit('SET_USERGUANZHU', data.data.userGuanZhu)
            commit('SET_USERSTATUS', data.data.userStatus)
            commit('SET_USERTONGZHI', data.data.userTongZhi)
            commit('SET_USERHISTORY', data.data.userHistory)
            resolve(res)
          })
      })
    }
  }
}

export default user
