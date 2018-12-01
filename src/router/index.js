import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import lovePage from '@/components/pages/lovePage'
import loveContent from '@/components/pages/loveContent'
import axios from "axios"
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/love',
      component: lovePage,
      children: [
        {
          path: "/",
          name: "loveContent",
          component: loveContent
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  axios({
    method: "get",
    url: "/checkPermission",
  }).then(response => {
    if (response.data.code == "203") {
      if (to.path == "/" || to.path == "/register") {
        next("/love")
        return
      }
      next()
      return
    } else if (response.data.code == "201") {
      if (to.path == "/" || to.path == "/register") {
        next()
        return
      }
      next("/")
      return
    } else if (response.data.code == "202") {
      Message.error({ 'message': response.data.msg, 'center': true })
      next("/")
      return
    }
  }).catch(error => {
    Message.error({ 'message': "未知错误", 'center': true })
    if (to.path == "/") {
      next()
      return
    }
    next("/")
    return
  })
})

export default router