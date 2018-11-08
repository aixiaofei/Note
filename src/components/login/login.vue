<template>
  <div class="parent_div">
    <el-card shadow="shadow" class="card">
      <el-form ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item class="title">
          <i class="icon iconfont icon-denglu main_icon"></i>
        </el-form-item>
        <el-form-item prop="name">
          <el-input placeholder="请输入用户名" v-model="form.name">
            <i slot="prefix" class="icon iconfont icon-account"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="form.password">
            <i slot="prefix" class="icon iconfont icon-password"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
        <el-form-item class="register">
          <span style="color: #409EFF;cursor: pointer" @click="goRegister">注册新账号</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      if (/^\d+$/.test(value)) {
        callback(new Error("用户名不能全为数字"));
      }
      if (!/^[\S]{3,12}$/.test(value)) {
        callback(new Error("用户名大小为3到12位，且不能出现空格"));
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
      if (/^\d+$/.test(value) || /^[a-z]+$/.test(value)) {
        callback(new Error("密码为字母和数字的组合"));
      }
      callback();
    };
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goRegister() {
      this.$router.push("/register");
    }
  }
};
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
.el-button {
  width: 100%;
}
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0rem;
  margin-bottom: 0rem;
}
</style>