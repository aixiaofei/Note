<template>
  <div style="width:50%">
    <el-form ref="form" :model="form" size="medium" :label-position="labelPosition" label-width="4rem">
      <el-form-item label="便签主题:" align="left">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="是否重要:" align="left">
        <el-switch v-model="form.important"></el-switch>
      </el-form-item>
      <el-form-item label="内容:" align="left">
        <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="this.form.noteId>0" type="primary" @click="onSubmit">修改</el-button>
        <el-button v-else type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "Axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "editNote",
  created() {
    let buf = this.$route.params.noteId;
    if (buf != "addNote") {
      this.form.noteId = Number.parseInt(buf);
      let data = this.tableData.filter(item =>
        Object.is(item.noteId, this.form.noteId)
      );
      this.form = data[0];
      Object.is(data[0].important, 1)
        ? (this.form.important = true)
        : (this.form.important = false);
    }
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        noteId: -1,
        title: "",
        content: "",
        important: false,
        createTime: null,
        modifyTime: null
      }
    };
  },
  computed: mapState({
    tableData: state => state.tableData,
    user: state => state.user
  }),
  methods: {
    onSubmit() {
      debugger
      let now = new Date();
      now = this.GLOBAL.dateFtt('yyyy-MM-dd hh:mm:ss', now);
      if (this.form.noteId > 0) {
        this.form.modifyTime = now;
      } else {
        this.form.createTime = now;
        this.form.modifyTime = this.form.createTime;
      }
      this.changeNote();
    },
    changeNote() {
      axios({
        method: "post",
        url: "/note/addNote",
        data: {
          noteId: this.form.noteId,
          userName: this.user.userName,
          title: this.form.title,
          content: this.form.content,
          createTime: this.form.createTime,
          modifyTime: this.form.modifyTime,
          important: this.form.important ? 1 : 0
        }
      })
        .then(response => {
          if (Object.is(response.data.statu, "success")) {
            this.$message({
              message: response.data.msg,
              type: "success",
              center: true
            });
            this.$router.push("/note");
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
              center: true
            });
            this.$router.push("/note");
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "更新错误",
            type: "error",
            center: true
          });
          this.$router.push("/note");
          return false;
        });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>