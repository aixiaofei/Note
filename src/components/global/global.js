const BASE_URL = 'http://localhost:8080/'
const FILE_BUCKET = 'lovepicture-1257159905'
const FILE_REGION = 'ap-shanghai'
const PIC_URL = Object.is(process.env.NODE_ENV, 'development') ? '/pic' : '/pic'

export default {
  BASE_URL,
  FILE_BUCKET,
  FILE_REGION,
  PIC_URL,
  // 格式化时间
  dateFtt: require('date-fns/format')
}
