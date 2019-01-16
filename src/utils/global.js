const BASE_URL = 'http://localhost:8080/'
const FILE_BUCKET = 'lovepicture-1257159905'
const FILE_REGION = 'ap-shanghai'
const PIC_URL = 'http://lovepicture-1257159905.cos.ap-shanghai.myqcloud.com'

export default {
  BASE_URL,
  FILE_BUCKET,
  FILE_REGION,
  PIC_URL,
  // 格式化时间
  dateFtt: require('date-fns/format')
}
