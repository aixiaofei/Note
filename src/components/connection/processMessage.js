import Message from "@/components/connection/message"
import { Notification } from 'element-ui';
import store from "@/vuex/store";

const connection = {
    socket: null,
    openSocket(socket, event) {
        this.socket = socket;
        setInterval(() => method.sendHeart(this.socket), 5000);
    },
    closeSocket(event) {
        
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
        }
    }
}

const method = {
    sendHeart(socket) {
        socket.send(Message.produceHeart());
    }
}

export default connection;