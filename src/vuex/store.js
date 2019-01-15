import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import http from '@/components/global/axios'
Vue.use(Vuex)

const state = {
  user: {},
  loveUser: {},
  loveUserOnline: false,
  myloveNumber: 0,
  loveNumber: 0
}

const mutations = {
  changeUser(state, user) {
    state.user = user
  },
  changeLoveUser(state, user) {
    state.loveUser = user
  },
  changeLoveUserOnline(state, online) {
    state.loveUserOnline = online
  },
  changeLoveNumber(state, relation) {
    state.myloveNumber = relation.myloveNumber
    state.loveNumber = relation.loveNumber
  }
}

const actions = {
  getLoveInfo({ commit }, user) {
    return new Promise((reslove, reject) => {
      http
        .get('/love/getLoveInfo', {
          userId: user.userId
        })
        .then(response => {
          if (response.flag) {
            commit('changeLoveUser', response.data.data)
          } else {
            commit('changeLoveUser', {})
          }
          reslove(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkLoveOnline({ commit }, loveUser) {
    return new Promise((reslove, reject) => {
      http
        .get('/love/checkLoveOnline', {
          userId: loveUser.userId
        })
        .then(response => {
          if (response.flag) {
            commit('changeLoveUserOnline', true)
          } else {
            commit('changeLoveUserOnline', false)
          }
          reslove()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexAlong]
})

export default store
