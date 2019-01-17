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
          path: '',
          name: 'LoveContent',
          component: () => import('@/views/loveContent')
        }
      ]
    }
  ]
})

const whiteList = ['/register']

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path) || to.params.notCheck) {
    next()
    return
  }
  http.get('/checkPermission').then(response => {
    if (Object.is(response.data.code, '203')) {
      if (Object.is(to.path, '/')) {
        next('/love')
      } else next()
    }
  })
})

export default router
