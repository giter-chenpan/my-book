import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routerList = [
  {
    path: '/home/index',
    name: 'Index',
    component: () =>
      import('@/page/index'),
    meta: {
      title: '首页',
      power: '首页'
    }
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () =>
        import('@/page/home.vue'),
      redirect: 'home/index',
      children: routerList
    }
  ]
})
