import * as qiniu from 'qiniu-js'
import axios from "axios";
const fileUpload = class fileUpload {
    static upload(fileContent, key) {
        axios({
            method: "post",
            url: "/common/getFileSign",
            data: {
                key: key,
            }
        }).then(response => {
            if (Object.is(response.data.statu, "success")) {
                let config = {
                    region: qiniu.region.z0
                }
                let putExtra = {
                    fname: fileContent.file.name,
                    mimeType: null
                }
                let observable = qiniu.upload(fileContent.file, key, response.data.data, putExtra, config);
                let subscription = observable.subscribe({
                    next(res) {
                        fileContent.onProgress(res.total);
                    },
                    error(err) {
                        console.log(err.message);
                        fileContent.onError(err);
                    },
                    complete(data) {
                        fileContent.onSuccess(data);
                    }
                })
                return subscription;
            }
        }).catch(error => {
            console.log(error);
        })
    }

}

export default fileUpload