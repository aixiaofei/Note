import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import lovePage from '@/components/pages/lovePage'
import viewNote from '@/components/pages/viewNote'
import editNote from '@/components/pages/editNote'
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
      name: 'love',
      component: lovePage,
      children: [
        {
          path: '/',
          name: 'viewNote',
          component: viewNote
        },
        {
          path: 'editNote/:noteId',
          name: 'editNote',
          component: editNote
        }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == "/" || to.path == "/register") {
    next()
    return
  }
  axios({
    method: "get",
    baseURL: "/api",
    url: "/checkPermission",
  }).then(response => {
    if (response.data.code == "200") {
      next()
      return
    } else if (response.data.code == "201") {
      Message.error({ 'message': response.data.msg, 'center': true })
      next("/")
      return
    } else if (response.data.code == "202") {
      Message.error({ 'message': response.data.msg, 'center': true })
      next("/")
      return
    }
  }).catch(error => {
    Message.error({ 'message': "未知错误", 'center': true })
    next("/")
    return
  })
})

export default router