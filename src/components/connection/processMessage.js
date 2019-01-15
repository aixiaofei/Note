import Message from '@/components/connection/message'
import { Notification } from 'element-ui'
import store from '@/vuex/store'

const connection = {
  socket: null,
  heart: null,
  openSocket(socket) {
    this.socket = socket
    this.heart = setInterval(() => this.sendHeart(), 5000)
  },
  closeSocket() {
    if (this.heart != null) {
      clearInterval(this.heart)
      this.heart = null
    }
  },
  processSocketMessage(data) {
    const message = JSON.parse(data.data)
    Notification.info({
      title: '系统消息',
      message: message.data,
      position: 'bottom-right'
    })
    switch (message.code) {
      case 1:
        store.commit('changeLoveUserOnline', true)
        break
      case 2:
        store.commit('changeLoveUserOnline', false)
        break
      case 3:
        console.log('session会话失效')
        this.socket.close()
        break
      default:
        break
    }
  },
  sendHeart() {
    this.socket.send(Message.produceHeart())
  }
}

export default connection
