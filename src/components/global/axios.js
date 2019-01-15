import router from '@/router/index'
import { Message } from 'element-ui'
import globalData from '@/components/global/global'
import axios from 'axios'

axios.defaults.baseURL = globalData.BASE_URL
axios.defaults.timeout = 3000

// response 拦截器
axios.interceptors.response.use(
  response => {
    if (['201', '202'].includes(response.data.code)) {
      Message.error({ 'message': response.data.msg, 'center': true })
      router.push('/')
      return false
    }
  },
  error => {
    console.log(error)
    Message.error({ 'message': '未知请求错误', 'center': true })
    router.push('/')
    return false
  }
)

export default {
  get(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'get',
        url: url,
        params: data
      }).then(response => {
        if (Object.is(response.data.statu, 'success')) {
          response = Object.assign(response, {
            flag: true
          })
          reslove(response)
        } else {
          reslove(response)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  },

  post(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data
      }).then(response => {
        if (Object.is(response.data.statu, 'success')) {
          response = Object.assign(response, {
            flag: true
          })
          reslove(response)
        } else {
          reslove(response)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}
