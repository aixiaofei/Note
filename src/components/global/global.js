import { mapState, mapMutations } from "vuex";
const BASE_URL = process.env.NODE_ENV == "development"? "/api": "/api";
const FILE_BUCKET = "lovepicture-1257159905"
const FILE_REGION = "ap-shanghai"
const PIC_URL = process.env.NODE_ENV == "development"? "/pic": "/pic"

export default {
  BASE_URL,
  FILE_BUCKET,
  FILE_REGION,
  PIC_URL,
  //格式化时间
  dateFtt(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  },
  computed: {
    ...mapState({
      user: state => state.user,
    })
  },
}