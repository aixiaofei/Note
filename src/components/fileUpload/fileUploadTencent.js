import COS from "cos-js-sdk-v5"
import axios from '@/components/global/axios'
import globalData from '@/components/global/global'
const fileUpload = class fileUpload {
    static upload(fileContent, key) {
        var cos = new COS({
            getAuthorization: function (options, callback) {
                axios.post("/common/getFileSignTencent", {
                    key: key,
                    type: "0"
                }).then((response) => {
                    if (response.flag) {
                        callback({
                            Authorization: response.data.data
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        });

        cos.putObject({
            Bucket: globalData.FILE_BUCKET,
            Region: globalData.FILE_REGION,
            Key: key,
            Body: fileContent.file,
            onProgress: function (progressData) {
                fileContent.onProgress({ percent: progressData.percent * 100 });
            },
        }, function (err, data) {
            if (err) {
                console.log(err);
                fileContent.onError(err);
            } else {
                fileContent.onSuccess(data);
            }
        });
    }
}

export default fileUpload