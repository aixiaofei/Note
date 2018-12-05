export default {
  install(Vue, options = {}) {

    const WS_URL = "localhost:8081/connection";
    const WSJS_URL = "localhost:8081/connectionSocketJs";
    const processMessage = options.processMessage;
    var recovery = null;
    var repeatNum = 0;
    var socket = null;
    const maxRepeatNum = 10;

    Vue.prototype.$socket = socket;

    Vue.prototype.$initSoket = init;

    function init() {
      if ('WebSocket' in window) {
        socket = new WebSocket(`ws://${WS_URL}`);
      } else {
        socket = new SockJS(`http://${WSJS_URL}`);
      }

      socket.onopen = function (event) {
        processMessage.openSocket(this, event);
        repeatNum = 0;
        if (recovery != null) {
          clearInterval(recovery);
          recovery = null;
        }
        console.log("连接成功");
      }
      socket.onclose = function (event) {
        processMessage.closeSocket(event);
        console.log(event.code + "," + event.reason + "," + event.wasClean);
        console.log("关闭连接");
        if (event.code != 1000 && event.code != 1001) {
          if (recovery == null) {
            console.log("启用恢复程序");
            recovery = setInterval(() => repeatLink(), 5000);
          }
        }
      }
      socket.onmessage = function (event) {
        processMessage.processSocketMessage(event);
      }
      socket.onerror = function (event) {
        console.log(event);
      }
    }

    function repeatLink() {
      repeatNum++;
      if (repeatNum > maxRepeatNum) {
        if (recovery != null) {
          clearInterval(recovery);
          recovery = null;
        }
        console.log("失联");
        return false;
      }
      console.log(`第${repeatNum}次重连`);
      init();
    }

    Vue.prototype.$sendSocketMessage = function (data) {
      socket.send(data);
    }

    Vue.mixin({
      methods: {
        getBackgroundColor(user) {
          if (Object.is(user.sex, 1)) {
            return {
              bule_background_color: true
            };
          } else {
            return {
              red_background_color: true
            };
          }
        },
        getColor(user) {
          if (Object.is(user.sex, 1)) {
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
    })
  }
}