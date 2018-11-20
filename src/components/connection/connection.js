export default {
    install(Vue, options = {}) {

        const WS_URL = "localhost:8081/connection";
        const WSJS_URL = "localhost:8081/connectionSocketJs";
        const processMessage = options.processMessage;

        Vue.prototype.$socket = null;

        Vue.prototype.$initSoket = function () {
            if ('WebSocket' in window) {
                this.$socket = new WebSocket(`ws://${WS_URL}`);
            } else {
                this.$socket = new SockJS(`http://${WSJS_URL}`);
            }

            this.$socket.onopen = function (event) {
                processMessage.openSocket(this, event);
                console.log("连接成功");
            }
            this.$socket.onclose = function (event) {
                processMessage.closeSocket(event);
                console.log(event.code + "," + event.reason + "," + event.wasClean);
                console.log("关闭连接");
            }
            this.$socket.onmessage = function (event) {
                processMessage.processSocketMessage(event);
            }
            this.$socket.onerror = function (event) {
                console.log(event);
            }
        }

        Vue.prototype.$sendSocketMessage = function (data) {
            this.$socket.send(data);
        }

        Vue.mixin({
            computed: {
                getMyColor() {
                    if (this.user.sex != undefined) {
                        if (Object.is(this.user.sex, 1)) {
                            return {
                                bule_color: true
                            };
                        } else {
                            return {
                                red_color: true
                            };
                        }
                    }
                },
                getLoveColor() {
                    if (this.user.sex != undefined) {
                        if (Object.is(this.user.sex, 1)) {
                            return {
                                red_color: true
                            };
                        } else {
                            return {
                                bule_color: true
                            };
                        }
                    }
                }
            }
        })
    }
}