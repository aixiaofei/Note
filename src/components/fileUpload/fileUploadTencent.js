import COS from "cos-nodejs-sdk-v5"
import axios from "axios";
import globalData from '@/components/global/global'
const fileUpload = class fileUpload {
    static upload(fileContent, url, key) {
        let cos = new COS({
            SecretId: 'AKIDe8PRElg3nHVS9auiPULyLUO3ShpuIkW6',
            SecretKey: 'VlmY5NDpDMHxOaWDfsrb6OQDj01lLgss',
            FileParallelLimit: 6,    // 控制文件上传并发数
            ChunkParallelLimit: 6,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
            ChunkSize: 1024 * 1024 * 8,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
        });

        cos.putObject({
            Bucket: "lovepicture-1257159905",
            Region: "ap-shanghai",
            Key: key,
            Body: url,
            onProgress: function (progressData) {
                debugger
                fileContent.onProgress(progressData);
            },
        }, function (err, data) {
            if (err) {
                debugger
                console.log(err);
                fileContent.onError(err);
            } else {
                fileContent.onSuccess(data);
            }
        });
    }
}

export default fileUpload