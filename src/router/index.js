import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/login/register')
    },
    {
      path: '/love',
      component: () => import('@/views/lovePage'),
      children: [
        {
          path: '/',
          name: 'loveContent',
          component: () => import('@/views/loveContent')
        }
      ]
    }
  ]
})

const whiteList = ['/', '/register']

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path) || !to.meta.sureCheck) {
    next()
    return
  }
  http.get({
    method: 'get',
    url: '/checkPermission'
  })
})

export default router
