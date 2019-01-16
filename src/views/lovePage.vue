<template>
  <div class="parent_div">
    <el-container>
      <el-header class="head" height="3rem">
        <el-row>
          <el-col :span="10" :offset="1">
            <div class="head_div">
              <img :src="indexIcon" class="head_div_img" alt="">
              <span class="head_div_span">简爱</span>
            </div>
          </el-col>
          <el-col :span="3" :offset="10">
            <div class="head_div">
              <el-dropdown class="head_div" @command="handleCommand">
                <v-avatar size="1.6rem" class="grey person">
                  <img v-if="user.avatarId > 0" :src="avatarUrl" alt="">
                  <div v-else>
                    <i class="icon iconfont icon-geren"/>
                  </div>
                </v-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">个人中心</el-dropdown-item>
                  <el-dropdown-item command="2">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-tooltip effect="dark" content="设置" placement="bottom">
                <i class="icon iconfont icon-setting setting_img img_margin"/>
              </el-tooltip>
              <el-tooltip effect="dark" content="版本记录" placement="bottom">
                <i class="icon iconfont icon-version setting_img img_margin"/>
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="17rem">
          <showStatus style="margin-top:2rem;margin-left:1rem"/>
          <weather style="margin-top:2rem;margin-left:1rem"/>
        </el-aside>
        <el-main>
          <div v-if="user.single">一条狗</div>
          <router-view v-else/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="userEditor" title="个人中心" center width="42%" @closed="closeDialog">
      <el-form ref="infoForm" :model="user" :rules="rules" label-position="right" status-icon size="small">
        <el-form-item :label-width="formLabelWidth" label="头像:">
          <div style="display: flex">
            <v-avatar size="4rem" class="grey person">
              <img v-if="user.avatarId > 0" :src="avatarUrl" alt="">
              <div v-else>
                <i class="icon iconfont icon-geren avatar_img"/>
              </div>
            </v-avatar>
            <el-progress
              v-if="showProgress"
              :stroke-width="3"
              :width="50"
              :percentage="progressData"
              type="circle"
              style="margin-left: 1rem;margin-top: auto;margin-bottom: auto"/>
            <el-upload
              v-else
              :data="fileData"
              :show-file-list="false"
              :http-request="uploadFile"
              :accept="fileAccept"
              :file-list="fileList"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              action=""
              style="margin-top: auto;margin-bottom: auto">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
                style="margin-left: 1rem"
                plain/>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户名:">
          {{ user.userName }}
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别:">
          {{ user.sex === 1?'男生': '女生' }}
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="生日:" prop="birth">
          <el-date-picker
            v-model="user.birth"
            value-format="yyyy-MM-dd"
            type="date"/>
          <el-button
            v-if="!Object.is(nowBirth, user.birth)"
            type="primary"
            plain
            size="small"
            style="margin-left: 1rem"
            @click="modifyDate">修改生日
          </el-button>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="恋爱状态:">
          <i v-if="user.single" class="icon iconfont icon-gou"/>
          <span v-else>拥有{{ user.sex === 1?"老婆":"老公" }}一枚,{{ user.sex === 1?"她":"他" }}叫{{ loveUser.userName }}</span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="我的Love-Lock:">
          {{ user.myLoveLock }}
        </el-form-item>
        <el-form-item v-if="!user.single" :label-width="formLabelWidth" label="另一半的Love-Lock:">
          {{ user.loveLock }}
          <el-button type="danger" plain size="small" style="margin-left: 1rem" @click="unLinkLove">解绑</el-button>
        </el-form-item>
        <el-form-item v-else :label-width="formLabelWidth" label="绑定另一半的Love-Lock:">
          <el-input
            v-model.trim="user.loveLock"
            style="width: 80%"
            placeholder="输入另一半的Love-Lock"
            prefix-icon="icon iconfont icon-love-lock"/>
          <el-button
            v-if="!Object.is(user.loveLock, '')"
            type="primary"
            plain
            size="small"
            style="margin-left: 1rem"
            @click="linkLove">绑定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import weather from '@/components/weather'
import showStatus from '@/components/showStatus'
import { mapState } from 'vuex'
import fileUpload from '@/utils/fileUpload/fileUploadTencent'
import { Base64 } from 'js-base64'

export default {
  name: 'LovePage',
  components: {
    weather,
    showStatus
  },
  data() {
    return {
      netpre: 'http://',
      indexIcon: require('@/assets/images/aixin.png'),
      avatarUrl: '',
      userEditor: false,
      formLabelWidth: '180px',
      fileData: {
        fileType: 0,
        fileSource: 2,
        fileSourceId: -1,
        fileDirectory: -1,
        fileName: '',
        fileKey: '',
        fileUrl: ''
      },
      fileAccept: 'image/jpg, image/jpeg, image/png',
      fileList: [],
      showProgress: false,
      progressData: 0,
      nowBirth: null,
      rules: {
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      loveUser: state => state.loveUser
    })
  },
  created() {
    this.$initSoket()
    if (!this.user.single) {
      this.getLoveNumber(this.user)
    }
    this.getAvatar()
    this.nowBirth = this.user.birth
  },
  methods: {
    getLoveNumber(user) {
      this.$http
        .get('/love/getLoveNumber', {
          userId: user.userId
        })
        .then(response => {
          if (response.flag) {
            this.$store.commit('changeLoveNumber', response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAvatar() {
      this.$http.post('/user/getAvatar', {
        fileId: this.user.avatarId
      }).then(response => {
        if (response.flag) {
          this.avatarUrl = this.netpre + response.data.data.fileUrl
        }
      })
    },
    handleCommand(command) {
      switch (command) {
        case '1':
          this.showUserEditor()
          break
        case '2':
          this.signOut()
          break
        default:
          break
      }
    },
    closeDialog() {
      this.$refs['infoForm'].resetFields()
      this.user.birth = this.nowBirth
      if (this.user.single) {
        this.user.loveLock = ''
      }
    },
    signOut() {
      this.$http.post('/user/signOut', this.user).then(response => {
        if (response.flag) {
          this.$notify({
            title: '系统通知',
            message: response.data.msg,
            type: 'success',
            position: 'bottom-right'
          })
          this.$router.push('/')
        }
      })
    },
    showUserEditor() {
      this.userEditor = true
    },
    uploadFile(item) {
      const fileName = item.file.name
      const index = fileName.substring(fileName.lastIndexOf('.'))
      let key = `${this.user.userName} ${fileName.substring(0, fileName.lastIndexOf('.'))} ${this.GLOBAL.dateFtt('YYYY-MM-DD HH:mm:ss', new Date())}`
      key = `/${Base64.encode(key)}${index}`
      this.showProgress = true
      fileUpload.upload(item, key, this.changePorgress)
    },
    changePorgress(progress) {
      this.progressData = progress
    },
    uploadSuccess(response, file) {
      this.progressData = 0
      this.showProgress = false
      const fileName = file.name.split('.')
      const index = fileName[fileName.length - 1]
      let key =
          this.user.userName +
          ' ' +
          fileName[0] +
          ' ' +
          this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
      key = '/' + Base64.encode(key) + '.' + index
      this.fileData.fileName = file.name
      this.fileData.fileKey = key
      this.fileData.fileUrl = response.Location
      this.changeAvatar()
    },
    uploadError() {
      this.progressData = 0
      this.showProgress = false
      this.$notify({
        title: '系统通知',
        message: '上传错误',
        type: 'error',
        position: 'bottom-right'
      })
      return false
    },
    changeAvatar() {
      this.fileData.fileSourceId = this.user.userId
      this.$http.post('/user/uploadAvatar', this.fileData).then(response => {
        if (response.flag) {
          this.$store.commit('changeUser', response.data.data)
          this.getAvatar()
          this.$notify({
            title: '系统通知',
            message: '修改成功',
            type: 'success',
            position: 'bottom-right'
          })
        }
      }).catch(() => {
        this.$notify({
          title: '系统通知',
          message: '修改失败',
          type: 'error',
          position: 'bottom-right'
        })
      })
    },
    modifyDate() {
      this.$refs['infoForm'].validateField('birth', valid => {
        if (Object.is(valid, '')) {
          this.$confirm('需要修改生日吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/user/modifyBirth', {
              userId: this.user.userId,
              birth: this.user.birth
            }).then(response => {
              if (response.flag) {
                this.$store.commit('changeUser', response.data.data)
                this.nowBirth = response.data.data.birth
                this.$notify({
                  title: '系统通知',
                  message: '修改成功',
                  type: 'success',
                  position: 'bottom-right'
                })
              }
            }).catch(() => {
              this.$notify({
                title: '系统通知',
                message: '修改失败',
                type: 'error',
                position: 'bottom-right'
              })
            })
          }).catch(() => {
          })
        }
      })
    },
    linkLove() {
      this.$confirm('确定绑定该Love-Lock', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post()
      }).catch(() => {
      })
    },
    unLinkLove() {

    }
  }
}

</script>

<style scoped>
  .parent_div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .head {
    background-color: white;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
  }

  .head_div {
    height: 100%;
    display: flex;
  }

  .head_div_img {
    height: 1.8rem;
    width: 1.8rem;
    margin-top: auto;
    margin-bottom: auto;
  }

  .head_div_span {
    font-size: 1rem;
    margin-left: 0.2rem;
    margin-top: auto;
    margin-bottom: auto;
  }

  .el-row {
    width: 100%;
  }

  .el-col {
    height: 100%;
  }

  .person {
    margin-top: auto;
    margin-bottom: auto;
  }

  .setting_img {
    font-size: 1.4rem;
    margin-top: auto;
    margin-bottom: auto;
    color: #606266;
  }

  .img_margin {
    margin-left: 1.3rem;
  }

  .avatar_img {
    font-size: 2rem;
  }

  .el-form-item {
    margin-bottom: 0.4rem;
  }

</style>
