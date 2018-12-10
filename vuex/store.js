import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

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
        state.user = user;
    },
    changeLoveUser(state, user) {
        state.loveUser = user;
    },
    changeLoveUserOnline(state, online) {
        state.loveUserOnline = online
    },
    changeLoveNumber(state, relation) {
        state.myloveNumber = relation.myloveNumber;
        state.loveNumber = relation.loveNumber;
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    plugins: [vuexAlong]
})

export default store