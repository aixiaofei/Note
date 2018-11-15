import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

const state = {
    user: {},
    tableData: []
}

const mutations = {
    changeUser(state, user) {
        state.user = user
    },
    changeTable(state, tableData) {
        state.tableData = tableData;
    },
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [vuexAlong]
})