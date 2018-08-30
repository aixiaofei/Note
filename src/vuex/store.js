import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'Axios'
import { Message } from 'element-ui';

Vue.use(Vuex);

const state = {
    city: "",
    updataTime: '',
    weatherData: '',
    dateDes: ['今天', '明天', '后天'],
    isOne: true,
}

const mutations = {
    changeCity(state) {
        axios({
            method: "get",
            baseURL: "/weather",
            url:
                "/daily.json?key=2ifeg5yvlwdp8fga&location=ip&language=zh-Hans&unit=c&start=0"
        })
            .then(response => {
                // console.log(response);
                state.city = response.data.results[0].location.name;
                state.weatherData = response.data.results[0].daily;
                console.log(state.weatherData);
                // let time = response.data.results[0].last_update;
                let d = new Date();
                state.updataTime = d.toLocaleString();
                if (state.isOne) {
                    state.isOne = !state.isOne;
                } else {
                    Message.success({ 'message': '天气加载完毕', 'center': true });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default new Vuex.Store({
    state, mutations
})