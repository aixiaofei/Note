import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/login/login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/login/register')
    },
    {
      path: '/love',
      component: () => import('@/components/pages/lovePage'),
      children: [
        {
          path: '/',
          name: 'loveContent',
          component: () => import('@/components/pages/loveContent')
        }
      ]
    }
  ]
})

const whiteList = ['/register']

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) next()
  axios({
    method: 'get',
    url: '/checkPermission'
  }).then(response => {
    if (Object.is(response.data.code, '203')) {
      if (['/'].includes(to.path)) {
        next('/love')
      }
      next()
    } else if (Object.is(response.data.code, '201')) {
      if (['/'].includes(to.path)) {
        next()
      }
      next('/')
    } else if (Object.is(response.data.code, '202')) {
      Message.error({ 'message': response.data.msg, 'center': true })
      next('/')
    }
  }).catch(() => {
    Message.error({ 'message': '未知错误', 'center': true })
    next('/')
  })
})

export default router
