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
  },
  {
    path: '/home/article/:id',
    name: 'Article',
    component: () =>
      import('@/page/article'),
    meta: {
      title: '文章',
      power: '文章'
    }
  },
  {
    path: '/home/addarticle',
    name: 'AddArticle',
    component: () =>
      import('@/page/addArticle'),
    meta: {
      title: '新增文章',
      power: '新增文章'
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
    },
    {
      path: '/err',
      name: 'ERR',
      component: () =>
        import('@/page/err')
    }
  ]
})
