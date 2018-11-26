<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float: left">
          <el-button type="primary" @click="showAddLoveLittle">发布你的爱情点滴</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">

      </el-col>
    </el-row>
    <el-dialog title="书写你的爱情点滴" :visible.sync="loveLittleFormVisible" :before-close="closeDialog" width="70%" :top="dialogTop">
      <el-form :model="loveLittleForm" ref="loveLittleForm" :rules="rules" status-icon>
        <el-form-item label="点滴标题:" :label-width="formLabelWidth" prop="title">
          <el-input v-model="loveLittleForm.title" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="点滴内容:" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="loveLittleForm.content" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="点滴类型:" :label-width="formLabelWidth" style="text-align: left" prop="type">
          <el-select v-model="loveLittleForm.type" placeholder="请选择类型">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配爱值:" :label-width="formLabelWidth" style="text-align: left">
          <el-input-number v-model="loveLittleForm.loveNumber" :min="-90" :max="90"></el-input-number>
        </el-form-item>
        <el-form-item label="重要程度:" :label-width="formLabelWidth" style="text-align: left">
          <div class="div_rate">
            <el-rate class="rate" v-model="loveLittleForm.important" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </el-form-item>
        <el-form-item label="上传点滴图片:" :label-width="formLabelWidth" style="text-align: left">
          <el-upload action="" :http-request="uploadFile" :on-change="fileChange" :auto-upload="false" :on-error="uploadError" :on-success="uploadSuccess" :accept="fileAccept" :multiple="true" :before-upload="fileBeforeUpload" :limit="9" :on-exceed="fileExceed" :file-list="fileList" ref="upload" list-type="picture-card" :on-preview="fileIn" :on-remove="fileRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="appendBody" :top="dialogTop">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddLoveLittle">取消</el-button>
        <el-button type="primary" @click="startUpload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import fileUpload from "@/components/fileUpload/fileUploadTencent"
export default {
  name: "loveLittle",
  data() {
    return {
      thisLittleId: null,
      formLabelWidth: "100px",
      dialogTop: "2rem",
      appendBody: true,
      typeOptions: [
        {
          value: 0,
          label: "索要"
        },
        {
          value: 1,
          label: "惩罚"
        }
      ],
      showHeader: false,
      loveLittleFormVisible: false,
      loveLittleForm: {
        title: "",
        content: "",
        loveNumber: 5,
        important: 1,
        type: null,
        status: 0
      },
      loveLittle: {},
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      fileAccept: "image/jpg, image/jpeg, image/png",
      completeNum: 0,
      uploadData: {
        fileType: 0,
        fileSource: 0,
        fileSourceId: -1,
        fileDerectory: -1,
        file: []
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在3到50个字符", trigger: "blur" }
        ],
        content: [
          { min: 0, max: 999, message: "长度不超过999个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  watch: {
    completeNum(newValue, oldValue) {
      if(newValue == this.fileList.length) {
        this.addLoveLittle();
      }
    }
  },
  methods: {
    closeDialog(done) {
      if (this.loveLittleFormVisible) {
        this.fileList = [];
        this.$refs["loveLittleForm"].resetFields();
      } else {
        this.thisLittleId = null;
      }
      this.loveLittleFormVisible = !this.loveLittleFormVisible;
      done();
    },
    showAddLoveLittle() {
      if (this.loveLittleFormVisible) {
        this.fileList = [];
        this.$refs["loveLittleForm"].resetFields();
      } else {
        this.thisLittleId = null;
      }
      this.loveLittleFormVisible = !this.loveLittleFormVisible;
    },
    fileIn(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileRemove(file, fileList) {},
    fileExceed(files, fileList) {
      this.$message({
        message: "最多上传9张图片",
        type: "warning",
        center: true
      });
      return false;
    },
    fileChange(file, fileList) {
      if (Object.is(file.status, "ready")) {
        if (file.size > 10 * 1024 * 1024) {
          fileList = fileList.filter(item => !Object.is(item.uid, file.uid));
          this.fileList = fileList;
          this.$message({
            message: "文件不得超过10M",
            type: "warning",
            center: true
          });
        }else{
          this.fileList = fileList;
        }
      }
    },
    fileBeforeUpload(file) {},
    uploadFile(item) {
      let url = this.fileList.filter(buf => Object.is(buf.uid, item.file.uid));
      url = url[0].url;
      let fileName = item.file.name.split(".");
      let index = fileName[fileName.length-1];
      let key = this.user.userName + " " + fileName[0] + " " + this.GLOBAL.dateFtt("yyyy-MM-dd hh:mm:ss", new Date()) + "." + index;
      let subscription = fileUpload.upload(item, url, key);
    },
    uploadSuccess(response, file, fileList) {
      this.uploadData.file.push(response);
      this.completeNum++;
    },
    uploadError(err, file, fileList) {
      this.completeNum++;
    },
    startUpload() {
      this.$refs['loveLittleForm'].validate(valid => {
        if(valid) {
          if(this.fileList.length == 0) {
            this.addLoveLittle();
          } else{
            this.$refs.upload.submit();
          }
        }
      })
    },
    addLoveLittle() {
      this.$refs['loveLittleForm'].validate(valid => {
        if (valid) {
          if (Object.is(this.thisLittleId, null)) {
            let createTime = this.GLOBAL.dateFtt(
              "yyyy-MM-dd hh:mm:ss",
              new Date()
            );
            let lastModifyTime = createTime;
            let foundUserId = this.user.userId;
            let otherData = {
              createTime: createTime,
              lastModifyTime: lastModifyTime,
              foundUserId: foundUserId
            };
            this.loveLittleForm = Object.assign(this.loveLittleForm, otherData);
          } else {
          }
          this.loveLittleForm = Object.assign(this.loveLittleForm, this.uploadData);
          axios({
            method: "post",
            url: "/love/saveLoveLittle",
            data: this.loveLittleForm
          })
            .then(response => {
              if (Object.is(response.data.statu, "success")) {
                this.$message({
                  message: response.data.msg,
                  type: "success",
                  center: true
                });
                return true;
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "warning",
                  center: true
                });
                return false;
              }
            })
            .catch(error => {
              this.$message({
                message: "发生错误",
                type: "error",
                center: true
              });
              return false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.div_rate {
  display: flex;
  height: 40px;
}
.rate {
  margin-top: auto;
  margin-bottom: auto;
}
</style>