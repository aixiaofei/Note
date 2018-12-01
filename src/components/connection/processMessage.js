import Message from "@/components/connection/message"
import { Notification } from 'element-ui';
import store from "@/vuex/store";

const connection = {
    socket: null,
    heart: null,
    recovery: null,
    openSocket(socket, event) {
        this.socket = socket;
        this.heart = setInterval(() => method.sendHeart(this.socket), 5000);
    },
    closeSocket(event) {
        if(this.heart != null) {
            clearInterval(this.heart);
            this.heart = null;
        }
    },
    processSocketMessage(data) {
        let message = JSON.parse(data.data);
        Notification.info({
            title: '消息',
            message: message.data,
            position: 'bottom-right'
        });
        if(message.code == 1) {
            store.commit("changeLoveUserOnline", true);
        }else if(message.code == 2) {
            store.commit("changeLoveUserOnline", false);
        }else if(message.code == 3) {
            console.log("session会话失效");
            this.socket.close();
        }
    }
}

const method = {
    sendHeart(socket) {
        socket.send(Message.produceHeart());
    }
}

export default connection;