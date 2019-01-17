import router from '@/router/index'
import { Message } from 'element-ui'
import globalData from '@/utils/global'
import axios from 'axios'

axios.defaults.timeout = 5000

const instance = axios.create({
  baseURL: globalData.BASE_URL,
  withCredentials: true
})

const process = (url, data, method) => {
  return new Promise((resolve, reject) => {
    const tag = Object.is(method, 'get') ? 'params' : 'data'
    instance({
      method: method,
      url: url,
      [tag]: data
    }).then(response => {
      if (['201', '202'].includes(response.data.code)) {
        if (Object.is(response.data.code, '202')) Message.error({ 'message': response.data.msg, 'center': true })
        router.push({ name: 'Login', params: { notCheck: true }})
        return false
      }
      if (Object.is(response.data.statu, 'success')) {
        Object.assign(response, {
          flag: true
        })
      }
      resolve(response)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

export default {
  get(url, data = {}) {
    return process(url, data, 'get')
  },
  post(url, data = {}) {
    return process(url, data, 'post')
  }
}
