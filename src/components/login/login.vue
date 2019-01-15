<template>
  <div class="parent_div">
    <el-card
      shadow="shadow"
      class="card"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        status-icon
      >
        <el-form-item class="title">
          <i class="icon iconfont icon-heart main_icon"/>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
          >
            <i
              slot="prefix"
              class="icon iconfont icon-account"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          >
            <i
              slot="prefix"
              class="icon iconfont icon-password"
            />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('form')"
          >登录
          </el-button>
        </el-form-item>
        <el-form-item class="register">
          <span
            style="color: #409EFF;cursor: pointer"
            @click="goRegister"
          >注册新账号</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'Login',
  data() {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      if (!/^[\S]{3,12}$/.test(value)) {
        callback(new Error('用户名大小为3到12位，且不能出现空格'))
      }
      if (!/^(\d|[a-z])+$/.test(value) || /^\d+$/.test(value)) {
        callback(new Error('用户名包含数字和字母,不能为全数字'))
      }
      callback()
    }
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      if (!/^[\S]{6,12}$/.test(value)) {
        callback(new Error('密码大小为6到12位，且不能出现空格'))
      }
      if (!/^(\d|[a-z])+$/.test(value)) {
        callback(new Error('密码包含数字或者字母'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const now = this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
          const lastLoginIp = returnCitySN['cip']
          const lastLoginAddress = returnCitySN['cname']
          this.$http
            .post('/login/goLogin', {
              userName: this.form.name,
              password: Base64.encode(
                this.form.name + ',' + this.form.password
              ),
              lastLoginTime: now,
              lastLoginIp: lastLoginIp,
              lastLoginAddress: lastLoginAddress
            })
            .then(response => {
              if (response.flag) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  center: true
                })
                this.$store.commit('changeUser', response.data.data)
                if (response.data.data.single) {
                  this.$router.push('/love')
                  return false
                }
                this.$store.dispatch('getLoveInfo', response.data.data)
                  .then(response => {
                    this.$store.dispatch('checkLoveOnline', response.data.data).then(() => {
                      this.$router.push('/love')
                    })
                  })
                  .catch(error => {
                    console.log(error)
                  })
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error',
                  center: true
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '登录失败',
                type: 'error',
                center: true
              })
            })
        }
      })
    },
    goRegister() {
      this.$router.push('/register')
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.3rem;
  }

  .main_icon {
    font-size: 1.6rem;
  }

  .card {
    width: 17rem;
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
</style>
