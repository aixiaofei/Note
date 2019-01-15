import COS from 'cos-js-sdk-v5'
import http from '@/components/global/axios'
import globalData from '@/components/global/global'
const fileUpload = class fileUpload {
  static upload(fileContent, key, progress = null) {
    const cos = new COS({
      getAuthorization: function(options, callback) {
        http.post('/common/getFileSignTencent', {
          key: key,
          type: '0'
        }).then((response) => {
          if (response.flag) {
            callback({
              Authorization: response.data.data
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    })

    cos.putObject({
      Bucket: globalData.FILE_BUCKET,
      Region: globalData.FILE_REGION,
      Key: key,
      Body: fileContent.file,
      onProgress: function(progressData) {
        const percent = Math.round(progressData.percent * 100)
        fileContent.onProgress({ percent: percent })
        if (!Object.is(progress, null)) {
          progress(percent)
        }
      }
    }, function(err, data) {
      if (err) {
        console.log(err)
        fileContent.onError(err)
      } else {
        fileContent.onSuccess(data)
      }
    })
  }
}

export default fileUpload
