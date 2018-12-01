import axios from "axios";
import router from '@/router/index'
import { Message } from 'element-ui'
export default {
    get(url, data) {
        return new Promise((reslove, reject) => {
            axios({
                method: "get",
                url: url,
                params: data
            }).then(response => {
                if(response.data.code == "201" || response.data.code == "202") {
                    Message.error({ 'message': response.data.msg, 'center': true });
                    router.push("/");
                    return false;
                }
                if(Object.is(response.data.statu, "success")){
                    response = Object.assign(response, {
                        flag: true
                    })
                    reslove(response);
                }else{
                    reslove(response);
                }
            }).catch(error => {
                reject(error);
            })
        })
    },

    post(url, data) {
        return new Promise((reslove, reject) => {
            axios({
                method: "post",
                url: url,
                data: data
            }).then(response => {
                if(response.data.code == 201 || response.data.code == 202) {
                    Message.error({ 'message': response.data.msg, 'center': true });
                    router.push("/");
                    return false;
                }
                if(Object.is(response.data.statu, "success")){
                    response = Object.assign(response, {
                        flag: true
                    })
                    reslove(response);
                }else{
                    reslove(response);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }

}