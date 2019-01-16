<template>
  <div class="parent_div">
    <el-card shadow="shadow" class="card">
      <el-form ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item class="title">
          <i class="icon iconfont icon-find main_icon"/>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" prefix-icon="icon iconfont icon-account"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="icon iconfont icon-password"/>
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input v-model="form.repeatPassword" type="password" placeholder="请重复密码" prefix-icon="icon iconfont icon-repeat"/>
        </el-form-item>
        <el-form-item prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"/>
            <i slot="prefix" class="icon iconfont icon-sex"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择出生日期"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.loveLock" placeholder="请输入另一半的Love-Lock" prefix-icon="icon iconfont icon-love"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import http from '@/utils/axios'

export default {
  name: 'Register',
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
        callback(new Error('密码为字母和数字的组合'))
      }
      callback()
    }
    var checkRepeatPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入重复密码'))
      }
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        },
        {
          value: '3',
          label: '其他类型，目前没这功能',
          disabled: true
        }
      ],
      form: {
        name: '',
        password: '',
        repeatPassword: '',
        sex: '',
        birth: null,
        loveLock: ''
      },
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        repeatPassword: [{ validator: checkRepeatPassword, trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birth: [
          {
            type: 'date',
            required: true,
            message: '请选择出生日期',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const birth = this.GLOBAL.dateFtt('yyyy-MM-dd', this.form.birth)
          const now = this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
          const lastLoginIp = returnCitySN['cip']
          const lastLoginAddress = returnCitySN['cname']
          http.post('/login/goRegister', {
            userName: this.form.name,
            password: this.form.password,
            lastLoginTime: now,
            lastLoginIp: lastLoginIp,
            lastLoginAddress: lastLoginAddress,
            sex: Object.is(this.form.sex, '1') ? 1 : 2,
            birth: birth,
            loveLock: this.form.loveLock
          }).then(response => {
            if (response.flag) {
              this.$message({
                message: response.data.msg,
                type: 'success',
                center: true
              })
              this.$store.commit('changeUser', response.data.data)
              this.$router.push('/')
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error',
                center: true
              })
            }
          }).catch(() => {
            this.$message({
              message: '注册失败',
              type: 'error',
              center: true
            })
          })
        }
      })
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
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-button {
  width: 100%;
}
</style>
