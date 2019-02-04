import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

// const whiteList = ['/login', '/auth-redirect']

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (!store.state.user.username) {
      store.dispatch('GetUser')
    }
    // 未激活的用户使他跳入邮箱激活区
    if (store.state.user.userStatus === 0) {
      if (to.path !== '/home/email') {
        next('/home/email')
        return
      }
    }
    next()
  } else {
    next()
  }
})
// 全局后置钩子
router.afterEach(() => {
})
