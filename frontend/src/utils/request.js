import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 设置axios对象
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000
})

// 拦截request请求
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['tiancai9'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 拦截response响应
service.interceptors.response.use(
  response => {
    return response
  },

  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
