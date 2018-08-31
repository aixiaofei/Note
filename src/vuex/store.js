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
    tableData: [
        {
            id: 1,
            title: "2016-05-02",
            Founder: "王小虎1",
            contentDes: "上海市普陀区金沙江路 1518 弄",
            isImpoertant: true,
            foundTime: "2016-05-02",
            lastModifyTime: "2016-05-02"
        },
        {
            id: 2,
            title: "2016-05-02",
            Founder: "王小虎2",
            contentDes: "上海市普陀区金沙江路 1517 弄",
            isImpoertant: true,
            foundTime: "2016-05-02",
            lastModifyTime: "2016-05-02"
        },
        {
            id: 3,
            title: "2016-05-01",
            Founder: "王小虎3",
            contentDes: "上海市普陀区金沙江路 1519 弄",
            isImpoertant: true,
            foundTime: "2016-05-02",
            lastModifyTime: "2016-05-02"
        },
        {
            id: 4,
            title: "2016-05-03",
            Founder: "王小虎4",
            contentDes: "上海市普陀区金沙江路 1516 弄",
            isImpoertant: true,
            foundTime: "2016-05-02",
            lastModifyTime: "2016-05-02"
        }
    ]
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
    },
    deleteTableData(state, Ids) {
        if (Ids instanceof Array) {
            state.tableData = state.tableData.filter(item => !Ids.includes(item.id));
        } else {
            state.tableData = state.tableData.filter(item => Ids != item.id);
        }
        console.log(state.tableData);
    },
    changeTableData(state, form) {
        if (form.id != 'addNote') {
            state.tableData = state.tableData.filter(item => item.id != form.id);
            state.tableData.push(form);
            Message.success({ 'message': '信息修改完毕', 'center': true });
        }else{
            state.tableData.push(form);
            Message.success({ 'message': '添加成功', 'center': true });
        }
    }
}

export default new Vuex.Store({
    state, mutations
})