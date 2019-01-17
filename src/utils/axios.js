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
    if (Object.is(response.data.code, '201')) {
      router.push({ name: 'Login', params: { notCheck: true }})
      return Promise.reject('用户未登录')
    }
    if (Object.is(response.data.code, '202')) {
      Message.error({ 'message': response.data.msg, 'center': true })
      router.push({ name: 'Login', params: { notCheck: true }})
      return Promise.reject('会话失效')
    }
    return response
  },
  error => {
    router.push({ name: 'Login', params: { notCheck: true }})
    return Promise.reject(error)
  }
)

export default {
  async get(url, data = {}) {
    let result = null
    await instance({
      method: 'get',
      url: url,
      params: data
    }).then(response => {
      if (Object.is(response.data.statu, 'success')) {
        Object.assign(response, {
          flag: true
        })
      }
      result = response
    }).catch(error => {
      console.log(error)
    })
    return result
  },

  async post(url, data = {}) {
    let result = null
    await instance({
      method: 'post',
      url: url,
      data: data
    }).then(response => {
      if (Object.is(response.data.statu, 'success')) {
        Object.assign(response, {
          flag: true
        })
      }
      result = response
    }).catch(error => {
      console.log(error)
    })
    return result
  }
}
