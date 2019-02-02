import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

// const whiteList = ['/login', '/auth-redirect']

// 全局导航守卫
router.beforeEach((to, from, next) => {
  console.log(getToken)
  if (getToken()) {
    if (!store.state.user.username) {
      console.log(store.state)
      store.dispatch('GetUser')
    }
    next()
  } else {
    next()
  }
})
// 全局后置钩子
router.afterEach(() => {
})
