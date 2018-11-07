<template>
    <div style="width:50%">
        <el-form ref="form" :model="form" label-width="4rem" :label-position="labelPosition">
            <el-form-item label="便签主题:" align="left">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="创建人:" align="left">
                <el-input v-model="form.Founder"></el-input>
            </el-form-item>
            <el-form-item label="是否重要:" align="left">
                <el-switch v-model="form.isImpoertant"></el-switch>
            </el-form-item>
            <el-form-item label="便签内容:" align="left">
                <el-input v-model="form.contentDes" type="textarea" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="noteId=='addNote'" type="primary" @click="onSubmit">创建</el-button>
                <el-button v-else type="primary" @click="onSubmit">修改</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState, mapMutations } from "vuex";
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
        id: "",
        title: "",
        Founder: "",
        contentDes: "",
        isImpoertant: false,
        foundTime: "",
        lastModifyTime: ""
      }
    };
  },
  computed:mapState(['tableData']),
  methods: {
      onSubmit() {
          if(this.noteId=='addNote'){
              this.form.id=100;
              this.form.foundTime= new Date().toLocaleString();
              this.form.lastModifyTime= this.form.foundTime;
          }else{
              this.form.id=this.noteId;
              this.form.lastModifyTime= new Date().toLocaleString();
          }
          this.$store.commit('changeTableData',this.form);
          this.$router.push('/');
      },
      goback:function(){
          this.$router.go(-1)
      }
  },
  store
};
</script>

<style scoped>
</style>