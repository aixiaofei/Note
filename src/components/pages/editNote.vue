<template>
    <div style="width:50%">
        <el-form ref="form" :model="form" size="medium" :label-position="labelPosition" label-width="4rem">
            <el-form-item label="便签主题:" align="left">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="创建人:" align="left">
                <el-input v-model="form.Founder"></el-input>
            </el-form-item>
            <el-form-item label="是否重要:" align="left">
                <el-switch v-model="form.isImportant"></el-switch>
            </el-form-item>
            <el-form-item label="内容:" align="left">
                <el-input v-model="form.contentDes" type="textarea" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import store from "@/vuex/store";
import { mapMutations } from "vuex";
export default {
  name: "editNote",
  created() {
    let buf = this.$route.params.noteId;
    this.noteId = buf;
    if (buf != "addNote") {
      let data = this.tableData.filter(item=>item.id==buf);
      this.form=data[0];
    }
  },
  data() {
    return {
      noteId: null,
      labelPosition: "right",
      form: {
        title: "",
        Founder: "",
        isImportant: false,
        contentDes: "",
        foundTime: "",
        lastModifyTime: ""
      }
    };
  },
  methods: {
    ...mapMutations(["changeTableData"]),
    onSubmit() {
      this.form.foundTime = new Date();
      this.form.lastModifyTime = this.form.foundTime;
      let id = {
        id: 100
      };
      this.form = Object.assign(this.form, id);
      this.$store.commit('changeTableData',this.form);
      this.$router.push('/');
    }
  },
  store
};
</script>

<style scoped>
</style>