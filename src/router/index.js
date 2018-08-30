import Vue from 'vue'
import Router from 'vue-router'
import Note from '@/components/pages/Note'
import editNote from '@/components/pages/editNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Note',
      component: Note
    },
    {
      path: '/editNote/:noteId',
      name: 'editNote',
      component: editNote
    }
  ]
})
