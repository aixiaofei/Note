<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float: left">
          <el-button v-if="loading" type="primary" @click="showAddLoveLittle">正在保存中...<i class="el-icon-loading"/>
          </el-button>
          <el-button v-else type="primary" @click="showAddLoveLittle">发布你的爱情点滴</el-button>
          <el-button :loading="flesh" type="primary" @click="getLoveLittleList">刷新</el-button>
        </div>
      </el-col>
    </el-row>
    <div v-loading="flesh" v-if="flesh" style="height: 2rem" element-loading-background="rgba(255, 255, 255, 0.9)"/>
    <div v-if="noLittle" style="margin-top: 2rem">
      暂无更多爱情点滴
    </div>
    <div v-for="(item, id) in loveLittle" :key="item.id" style="margin-top: 2rem">
      <el-row>
        <el-col :span="1">
          <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-love love_animation" style="font-size: 1rem"/>
        </el-col>
        <el-col :span="3">
          <div>
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-account little_icon"/>
            {{ item.foundUserId == user.userId? user.userName : loveUser.userName }}
          </div>
          <div>
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-fabu little_icon"/>
            {{ item.createTime }}
          </div>
          <div>
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-xiugai little_icon"/>
            {{ item.lastModifyTime }}
          </div>
        </el-col>
        <el-col :span="7">
          <div class="little_title">
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-title little_icon"/>
            {{ item.title }}
          </div>
          <div class="little_content">
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-content little_icon"/>
            {{ item.content }}
          </div>
        </el-col>
        <el-col :span="5">
          <div v-if="item.fileInfo.length == 0">
            <i :class="getColor(item.foundUserId == user.userId? user : loveUser)" class="icon iconfont icon-nopic" style="font-size: 2rem;float: left"/>
          </div>
          <el-popover v-else :open-delay="100" placement="left" width="500" trigger="click">
            <el-carousel ref="imgCarousel" :autoplay="false" indicator-position="none" arrow="hover">
              <el-carousel-item v-for="(show, index) in item.fileInfo" :key="index">
                <img :src="netpre+show.fileUrl" style="width: 100%; height: 100%" alt="">
              </el-carousel-item>
            </el-carousel>
            <div class="img_opearation">
              <el-tooltip :hide-after="1000" effect="dark" content="下载图片" placement="left">
                <el-button icon="el-icon-download" circle @click="downloadPic(id)"/>
              </el-tooltip>
              <el-tooltip :hide-after="1000" effect="dark" content="删除图片" placement="right">
                <el-button icon="el-icon-delete" circle @click="deletePic(id)"/>
              </el-tooltip>
            </div>
            <div slot="reference">
              <div v-for="(img, index) in item.fileInfo" :key="index">
                <img :src="netpre+img.fileUrl" class="pre_img" alt="" @mouseenter="setActiveItem(index, id)">
              </div>
            </div>
          </el-popover>
        </el-col>
        <el-col :span="3" :offset="1" style="text-align: left">
          <el-rate v-model="item.important" :colors="['#909399', '#409EFF', '#F56C6C']" disabled/>
          <div class="lock">
            <i
              :class="getColor(item.foundUserId == user.userId? user : loveUser)"
              class="icon iconfont icon-zhongyao little_icon"/>
            {{ texts[item.important] }}
          </div>
          <div v-if="item.type == 0" class="lock"><i
            :class="getColor(item.foundUserId == user.userId? user : loveUser)"
            class="icon iconfont icon-suoyao little_icon"/>
            {{ item.foundUserId == user.userId? '我': loveUser.sex == 1? '他':'她' }}想向宝宝索要{{ item.loveNumber }}爱值
          </div>
          <div v-else class="lock"><i
            :class="getColor(item.foundUserId == user.userId? user : loveUser)"
            class="icon iconfont icon-fameijin little_icon"/>
            {{ item.foundUserId == user.userId? '我': loveUser.sex == 1? '他':'她' }}想惩罚宝宝{{ item.loveNumber }}爱值
          </div>
        </el-col>
        <el-col :span="2" :offset="1">
          <div v-if="item.foundUserId == loveUser.userId">
            <div v-if="item.status == 0">
              <el-button class="accept_btn" type="primary" size="small" @click="responseLittle(id, 0)">
                {{ item.type==0?'奖励宝宝':'含泪接受' }}
              </el-button>
              <el-button class="reject_btn" type="danger" size="small" @click="responseLittle(id, 1)">{{ item.type==0 ? '残忍拒绝' : '奋力反抗' }}
              </el-button>
            </div>
            <div v-else>
              <i v-if="item.result == 0" class="icon iconfont icon-yipizhun result bule_color"/>
              <i v-else class="icon iconfont icon-weipizhun result red_color"/>
            </div>
          </div>
          <div v-else>
            <div v-if="item.status == 0" style="float: left">
              <i :class="getColor(item.foundUserId == user.userId? loveUser : user)" class="icon iconfont icon-hulve ignore"/>
              <div style="margin-top: 2.5rem">{{ loveUser.sex == 1 ? '他' : '她' }}还没有看</div>
            </div>
            <div v-else>
              <i v-if="item.result == 0" class="icon iconfont icon-yipizhun result bule_color"/>
              <i v-else class="icon iconfont icon-weipizhun result red_color"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-loading="loadMore" class="foot_load_div" element-loading-background="rgba(255, 255, 255, 0.9)">
      <el-button size="small" type="primary" @click="loadMoreLittle">加载更多</el-button>
    </div>
    <el-dialog
      :visible.sync="loveLittleFormVisible"
      :before-close="closeDialog"
      :top="dialogTop"
      title="书写你的爱情点滴"
      width="80%">
      <Spin v-if="loading" size="large" fix/>
      <el-form ref="loveLittleForm" :model="loveLittleForm" :rules="rules" status-icon>
        <el-form-item :label-width="formLabelWidth" label="点滴标题:" prop="title">
          <el-input v-model="loveLittleForm.title" autocomplete="off" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="点滴内容:" prop="content">
          <el-input
            :autosize="{ minRows: 2, maxRows: 6}"
            v-model="loveLittleForm.content"
            type="textarea"
            autocomplete="off"
            clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="点滴类型:" style="text-align: left" prop="type">
          <el-select v-model="loveLittleForm.type" placeholder="请选择类型">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分配爱值:" style="text-align: left">
          <el-input-number v-model="loveLittleForm.loveNumber" :min="1" :max="90"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="重要程度:" style="text-align: left">
          <div class="div_rate">
            <el-rate v-model="loveLittleForm.important" :colors="['#909399', '#409EFF', '#F56C6C']" class="rate"/>
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="上传点滴图片:" style="text-align: left">
          <el-upload
            ref="upload"
            :http-request="uploadFile"
            :on-change="fileChange"
            :auto-upload="false"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :accept="fileAccept"
            :multiple="true"
            :limit="9"
            :on-exceed="fileExceed"
            :file-list="fileList"
            :on-preview="fileIn"
            :on-remove="fileRemove"
            action=""
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="appendBody" :top="dialogTop">
            <img :src="dialogImageUrl" width="100%" alt="">
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
import { Base64 } from 'js-base64'
import { mapState } from 'vuex'
import fileUpload from '@/utils/fileUpload/fileUploadTencent'

export default {
  name: 'LoveLittle',
  data() {
    return {
      netpre: 'http://',
      noLittle: false,
      flesh: false,
      loadMore: false,
      texts: [
        '就当我没说',
        '随意',
        '最好看一下啦',
        '没事最好看看',
        '不看你试试',
        '你懂吧!'
      ],
      thisLittleId: null,
      formLabelWidth: '100px',
      dialogTop: '2rem',
      appendBody: true,
      typeOptions: [{
        value: 0,
        label: '索要'
      },
      {
        value: 1,
        label: '惩罚'
      }
      ],
      showHeader: false,
      loveLittleFormVisible: false,
      loveLittleForm: {
        title: '',
        content: '',
        loveNumber: 5,
        important: 1,
        type: null,
        status: 0,
        result: 0
      },
      loveLittle: [],
      page: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      fileAccept: 'image/jpg, image/jpeg, image/png',
      completeNum: 0,
      uploadData: {
        fileType: 0,
        fileSource: 0,
        fileDerectory: -1,
        file: []
      },
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 50,
          message: '长度在3到50个字符',
          trigger: 'blur'
        }
        ],
        content: [{
          min: 0,
          max: 999,
          message: '长度不超过999个字符',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请选择类型',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      loveUser: state => state.loveUser
    }),
    emptyArr() {
      const arr = []
      arr[0] = 0
      for (let i = 1; i < this.loveLittle.length; i++) {
        if (Object.is(i, 1)) {
          Object.is(this.loveLittle[0].fileInfo.length, 0) ? arr[1] = 1 : arr[1] = 0
        } else {
          Object.is(this.loveLittle[i - 1].fileInfo.length, 0) ? arr[i] = arr[i - 2] + 1 : arr[i] = arr[i - 1]
        }
      }
      return arr
    }
  },
  watch: {
    completeNum(newValue) {
      if (Object.is(newValue, this.fileList.length)) {
        this.addLoveLittle()
      }
    }
  },
  created() {
    this.getLoveLittleList()
  },
  methods: {
    getLoveLittleList() {
      return new Promise((reslove) => {
        if (!this.loadMore && !this.flesh) {
          this.flesh = true
          this.page = 1
        }
        this.$http.post('/love/getLoveLittle', {
          userId: this.user.userId,
          loveUserId: this.loveUser.userId,
          pageSize: this.pageSize,
          pageNum: this.page
        }).then(response => {
          if (response.flag) {
            if (this.flesh) {
              this.loveLittle = response.data.data
            }
            if (this.loadMore) {
              this.loveLittle = [...this.loveLittle, ...response.data.data]
            }
            this.noLittle = Object.is(this.loveLittle.length, 0)
            this.$message({
              message: response.data.msg,
              type: 'success',
              center: true
            })
            reslove()
          } else {
            this.$message({
              message: response.data.msg,
              type: 'error',
              center: true
            })
          }
        }).catch(() => {
          this.$message({
            message: '查询失败',
            type: 'error',
            center: true
          })
        }).finally(() => {
          if (this.flesh) {
            this.flesh = false
          }
          if (this.loadMore) {
            this.loadMore = false
          }
        })
      })
    },
    loadMoreLittle() {
      if (!this.loadMore && !this.flesh) {
        this.loadMore = true
        this.page = this.page + 1
        this.getLoveLittleList()
      }
    },
    setActiveItem(index, id) {
      id = id - this.emptyArr[id]
      const carousel = this.$refs.imgCarousel
      setTimeout(() => carousel[id].setActiveItem(index), 100)
    },
    downloadPic(id) {
      let index = this.emptyArr[id]
      const carousel = this.$refs.imgCarousel
      index = carousel[id].activeIndex
      const file = this.loveLittle[id].fileInfo[index]
      const eleLink = document.createElement('a')
      eleLink.download = file.fileName
      eleLink.style.display = 'none'
      eleLink.href = this.GLOBAL.PIC_URL + file.fileUrl.substring(file.fileUrl.lastIndexOf('/'))
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    },
    deletePic(id) {
      let index = this.emptyArr[id]
      const carousel = this.$refs.imgCarousel
      index = carousel[id].activeIndex
      const file = this.loveLittle[id].fileInfo[index]
      this.$confirm('确认删除图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.flesh = true
        this.$http.post('/love/deleteLittleFile', {
          fileSource: 0,
          fileSourceId: this.loveLittle[id].littleId,
          fileKey: file.fileKey
        }).then(response => {
          if (response.flag) {
            this.$notify({
              title: '系统通知',
              message: response.data.msg,
              type: 'success',
              position: 'bottom-right'
            })
            this.flesh = false
            this.getLoveLittleList()
          }
        }).catch(() => {
          this.$notify({
            title: '系统通知',
            message: '图片删除失败',
            type: 'error',
            position: 'bottom-right'
          })
          this.flesh = false
          this.getLoveLittleList()
        })
      })
    },
    responseLittle(id, action) {
      id = this.loveLittle[id].littleId
      const info = Object.is(action, 0) ? '确认接受?' : '确认拒绝?'
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/love/responseLittle', {
          id: id,
          action: action
        }).then(response => {
          if (response.flag) {
            this.$notify({
              title: '系统通知',
              message: response.data.msg,
              type: 'success',
              position: 'bottom-right'
            })
          }
          if (Object.is(action, 0)) {
            this.$store.commit('changeLoveNumber', response.data.data)
          }
          this.getLoveLittleList()
        })
      }).catch(() => {
        this.$notify({
          title: '系统通知',
          message: '更新失败',
          type: 'error',
          position: 'bottom-right'
        })
      })
    },
    closeDialog(done = null) {
      if (!this.loading) {
        this.fileList = []
        this.$refs['loveLittleForm'].resetFields()
        this.loveLittleForm.loveNumber = 5
        this.loveLittleForm.important = 1
        this.uploadData = {
          fileType: 0,
          fileSource: 0,
          fileDerectory: -1,
          file: []
        }
      }
      this.loveLittleFormVisible = false
      if (!Object.is(done, null)) {
        done()
      }
    },
    showAddLoveLittle() {
      if (this.loveLittleFormVisible) {
        this.fileList = []
        this.$refs['loveLittleForm'].resetFields()
        this.loveLittleForm.loveNumber = 5
        this.loveLittleForm.important = 1
        this.uploadData = {
          fileType: 0,
          fileSource: 0,
          fileDerectory: -1,
          file: []
        }
      } else {
        if (!this.loading) {
          this.thisLittleId = null
        }
      }
      this.loveLittleFormVisible = !this.loveLittleFormVisible
    },
    fileIn(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    fileRemove(file, fileList) {
    },
    fileExceed() {
      this.$message({
        message: '最多上传9张图片',
        type: 'warning',
        center: true
      })
    },
    fileChange(file, fileList) {
      if (Object.is(file.status, 'ready')) {
        if (file.size > 30 * 1024 * 1024) {
          fileList = fileList.filter(item => !Object.is(item.uid, file.uid))
          this.fileList = fileList
          this.$message({
            message: '文件不得超过30M',
            type: 'warning',
            center: true
          })
        } else {
          this.fileList = fileList
        }
      }
    },
    uploadFile(item) {
      const fileName = item.file.name.split('.')
      const index = fileName[fileName.length - 1]
      let key =
          this.user.userName +
          ' ' +
          fileName[0] +
          ' ' +
          this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
      key = '/' + Base64.encode(key) + '.' + index
      fileUpload.upload(item, key, null)
    },
    uploadSuccess(response, file) {
      const fileName = file.name.split('.')
      const index = fileName[fileName.length - 1]
      let key = this.user.userName + ' ' + fileName[0] + ' ' + this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
      key = '/' + Base64.encode(key) + '.' + index
      this.uploadData.file.push({
        name: file.name,
        key: key,
        url: response.Location
      })
      this.completeNum++
    },
    uploadError() {
      this.completeNum++
    },
    startUpload() {
      this.$refs['loveLittleForm'].validate(valid => {
        if (valid) {
          this.loading = true
          if (Object.is(this.fileList.length, 0)) {
            this.addLoveLittle()
          } else {
            this.$refs.upload.submit()
          }
        }
      })
    },
    addLoveLittle() {
      this.$refs['loveLittleForm'].validate(valid => {
        if (valid) {
          if (Object.is(this.thisLittleId, null)) {
            const createTime = this.GLOBAL.dateFtt(
              'yyyy-MM-dd hh:mm:ss',
              new Date()
            )
            const lastModifyTime = createTime
            const foundUserId = this.user.userId
            const otherData = {
              createTime: createTime,
              lastModifyTime: lastModifyTime,
              foundUserId: foundUserId
            }
            this.loveLittleForm = Object.assign(this.loveLittleForm, otherData)
          }
          this.loveLittleForm = Object.assign(
            this.loveLittleForm,
            this.uploadData
          )
          this.$http.post('/love/saveLoveLittle', this.loveLittleForm).then(response => {
            if (response.flag) {
              this.$notify({
                title: '系统通知',
                message: response.data.msg,
                type: 'success',
                position: 'bottom-right'
              })
            }
          }).catch(() => {
            this.$notify({
              title: '系统通知',
              message: '保存失败',
              type: 'error',
              position: 'bottom-right'
            })
          }).finally(() => {
            this.loading = false
            this.closeDialog()
            this.getLoveLittleList()
          })
        }
      })
    }
  }
}

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

  .little_icon {
    margin-right: 0.1rem;
  }

  .little_title {
    text-align: left;
    font-size: 0.8rem;
    height: 1rem;
  }

  .little_content {
    text-align: left;
    font-size: 0.6rem;
    margin-top: 1.2rem;
    height: 2rem;
    max-height: 4rem;
  }

  .pre_img {
    width: 20%;
    height: 20%;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    float: left;
  }

  .lock {
    font-size: 0.6rem;
    margin-top: 0.6rem;
  }

  .accept_btn {
    float: left;
    margin-left: 0;
    margin-top: 0.2rem;
  }

  .reject_btn {
    float: left;
    margin-top: 1rem;
    margin-left: 0
  }

  .ignore {
    float: left;
    font-size: 1rem;
    margin-top: 0.6rem;
  }

  .img_opearation {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 1rem;
  }

  .foot_load_div {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 1rem;
  }

  .result {
    float: left;
    font-size: 2rem;
  }

  .love_animation {
    position: relative;
    animation: love 4s ease infinite;
    -webkit-animation: love 4s ease infinite;
  }

  @keyframes love {
    0% {
      top: 0;
    }

    25% {
      top: 0.6rem;
    }

    50% {
      top: 1.2rem;
    }

    75% {
      top: 1.8rem;
    }

    100% {
      top: 2.4rem;
    }
  }

  @-webkit-keyframes love {
    0% {
      top: 0;
    }

    25% {
      top: 0.6rem;
    }

    50% {
      top: 1.2rem;
    }

    75% {
      top: 1.8rem;
    }

    100% {
      top: 2.4rem;
    }
  }

</style>
