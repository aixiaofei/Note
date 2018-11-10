<template>
    <div class="parent_div">
        <el-card shadow="shadow" class="card">
            <el-form ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item class="title">
                    <i class="icon iconfont icon-zhuce main_icon"></i>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input placeholder="请输入用户名" v-model="form.name">
                        <i slot="prefix" class="icon iconfont icon-account"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="form.password">
                        <i slot="prefix" class="icon iconfont icon-password"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repeatPassword">
                    <el-input type="password" placeholder="请重复密码" v-model="form.repeatPassword">
                        <i slot="prefix" class="icon iconfont icon-repeat"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from "axios"
import store from '@/vuex/store'
export default {
  name: "login",
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      if (!/^[\S]{3,12}$/.test(value)) {
        callback(new Error("用户名大小为3到12位，且不能出现空格"));
      }
      if (!/^(\d|[a-z])+$/.test(value) || /^\d+$/.test(value)) {
        callback(new Error("用户名包含数字和字母,不能为全数字"));
      }
      callback();
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (!/^[\S]{6,12}$/.test(value)) {
        callback(new Error("密码大小为6到12位，且不能出现空格"));
      }
      if (!/^(\d|[a-z])+$/.test(value)) {
        callback(new Error("密码为字母和数字的组合"));
      }
      callback();
    };
    var checkRepeatPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入重复密码"));
      }
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      }
      callback();
    };
    return {
      form: {
        name: "",
        password: "",
        repeatPassword: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        repeatPassword: [{ validator: checkRepeatPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            baseURL: "/api",
            url: "/login/goRegister",
            data: {
                userName: this.form.name,
                password: this.form.password
            }
          }).then(response => {
            if (response.data.statu === "success") {
              this.$message({
                message: response.data.msg,
                type: "success",
                center: true
              })
              this.$store.commit('changeUser', response.data.data)
              this.$router.push("/note");
            }else {
                this.$message({
                message: response.data.msg,
                type: "warning",
                center: true
              })
              return false
            }
          }).catch(error=>{
              this.$message({
                message: "注册失败",
                type: "error",
                center: true
              })
              return false
          })
        } else {
          console.log("error submit");
          return false;
        }
      });
    }
  },
  store
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
  height: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-button {
  width: 100%;
}
</style>