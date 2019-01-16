const Message = class Message {
  constructor(code, data) {
    this.code = code
    this.data = data
  }

  static produceHeart() {
    const message = new Message(200, '心跳')
    return JSON.stringify(message)
  }

  static produceMessage(data) {
    const message = new Message(201, data)
    return JSON.stringify(message)
  }

  static produceCommunication(data) {
    const message = new Message(202, data)
    return JSON.stringify(message)
  }
}

export default Message
