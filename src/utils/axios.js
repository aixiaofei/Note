import router from '@/router/index'
import { Message } from 'element-ui'
import globalData from '@/utils/global'
import axios from 'axios'

axios.defaults.timeout = 5000

const instance = axios.create({
  baseURL: globalData.BASE_URL,
  withCredentials: true
})

// response 拦截器
instance.interceptors.response.use(
  response => {
    if (['203', '200'].includes(response.data.code)) {
      return response
    } else if (Object.is(response.data.code, '201')) {
      router.push('/')
    } else if (Object.is(response.data.code, '202')) {
      Message.error({ 'message': response.data.msg, 'center': true })
      router.push('/')
    }
  },
  error => {
    console.log(error)
    Message.error({ 'message': '未知请求错误', 'center': true })
    router.push('/')
  }
)

export default {
  get(url, data) {
    return new Promise((reslove, reject) => {
      instance({
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
        reject()
      })
    })
  },

  post(url, data) {
    return new Promise((reslove, reject) => {
      instance({
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
        reject()
      })
    })
  }
}
