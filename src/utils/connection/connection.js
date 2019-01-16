import globalData from '@/utils/global'
import http from '@/utils/axios'

export default {
  installed: false,
  install(Vue, options = {}) {
    if (this.installed) return
    const WS_URL = 'localhost:8080/connectionSocket'
    const WSJS_URL = 'localhost:8080/connectionSocket'
    const processMessage = options.processMessage
    let recovery = null
    let repeatNum = 0
    let socket = null
    const maxRepeatNum = 10

    Vue.prototype.GLOBAL = globalData

    Vue.prototype.$http = http

    Vue.prototype.$initSoket = init

    function init() {
      if ('WebSocket' in window) {
        socket = new WebSocket(`ws://${WS_URL}`)
      } else {
        socket = new SockJS(`http://${WSJS_URL}`)
      }

      socket.onopen = function(event) {
        processMessage.openSocket(socket, event)
        repeatNum = 0
        if (!Object.is(recovery, null)) {
          clearInterval(recovery)
          recovery = null
        }
        console.log('连接成功')
      }
      socket.onclose = function(event) {
        processMessage.closeSocket(event)
        console.log(event.code + ',' + event.reason + ',' + event.wasClean)
        console.log('关闭连接')
        if (![1000, 1001].includes(event.code)) {
          if (Object.is(recovery, null)) {
            console.log('启用恢复程序')
            recovery = setInterval(() => repeatLink(), 5000)
          }
        }
      }
      socket.onmessage = function(event) {
        processMessage.processSocketMessage(event)
      }
      socket.onerror = function(event) {
        console.log(event)
      }
    }

    function repeatLink() {
      repeatNum++
      if (repeatNum > maxRepeatNum) {
        if (!Object.is(recovery, null)) {
          clearInterval(recovery)
          recovery = null
        }
        console.log('失联')
        processMessage.closeSocket(event)
        return false
      }
      console.log(`第${repeatNum}次重连`)
      init()
    }

    Vue.prototype.$sendSocketMessage = function(data) {
      socket.send(data)
    }

    Vue.mixin({
      methods: {
        getBackgroundColor(user) {
          return Object.is(user.sex, 1) ? { bule_background_color: true } : { red_background_color: true }
        },
        getColor(user) {
          return Object.is(user.sex, 1) ? { bule_color: true } : { red_color: true }
        }
      }
    })
    this.installed = true
  }
}
