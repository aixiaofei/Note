import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import notePage from '@/components/pages/notePage'
import viewNote from '@/components/pages/viewNote'
import editNote from '@/components/pages/editNote'
import axios from "axios"

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
      path: '/note',
      name: 'note',
      component: notePage,
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
  axios({
    method: "get",
    baseURL: "/api",
    url: "/checkPermission",
  }).then(response=>{
    if(response.data.code == "200"){
      next()
    }else{
      
    }
  })
})

export default router