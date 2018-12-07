<template>
  <div class="parent_div">
    <el-container>
      <el-header class="head" height="3rem">
        <el-row>
          <el-col :span="10" :offset="1">
            <div class="head_div">
              <img :src="indexIcon" class="head_div_img" />
              <span class="head_div_span">简爱</span>
            </div>
          </el-col>
          <el-col :span="3" :offset="10">
            <div class="head_div">
              <el-dropdown class="head_div" @command="handleCommand">
                <v-avatar size="1.6rem" class="grey person">
                  <img v-if="user.avatarId > 0" src="">
                  <div v-else>
                    <i class="icon iconfont icon-geren"></i>
                  </div>
                </v-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">个人中心</el-dropdown-item>
                  <el-dropdown-item command="2">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-tooltip effect="dark" content="设置" placement="bottom">
                <i class="icon iconfont icon-setting setting_img img_margin"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="版本记录" placement="bottom">
                <i class="icon iconfont icon-version setting_img img_margin"></i>
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="17rem">
          <showStatus style="margin-top:2rem;margin-left:1rem"></showStatus>
          <weather style="margin-top:2rem;margin-left:1rem"></weather>
        </el-aside>
        <el-main>
          <div v-if="user.single"></div>
          <router-view v-else></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="个人中心" :visible.sync="userEditor" center width="42%">
      <el-form :model="user" label-position="right" :rules="rules" ref="infoForm">
        <el-form-item label="头像:" :label-width="formLabelWidth">
          <div style="display: flex">
            <v-avatar size="4rem" class="grey person">
            <img v-if="user.avatarId > 0" src="">
            <div v-else>
              <i class="icon iconfont icon-geren avatar_img"></i>
            </div>
          </v-avatar>
          <el-upload action="" style="margin-top: auto;margin-bottom: auto" :data="fileData" show-file-list="false" >
            <el-button type="primary" icon="el-icon-edit" circle @click="modifyAvatar" size="small" style="margin-left: 1rem"
              plain></el-button>
          </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          {{user.userName}}
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          {{user.sex == 1?'男生': '女生'}}
        </el-form-item>
        <el-form-item label="生日:" :label-width="formLabelWidth" prop="birth">
          <el-date-picker v-model="user.birth" type="date" :default-value="user.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-button type="primary" @click="modifyDate" plain size="small" style="margin-left: 1rem">修改生日</el-button>
        </el-form-item>
        <el-form-item label="恋爱状态:" :label-width="formLabelWidth">
          <i v-if="user.single" class="icon iconfont icon-gougou"></i>
          <span>拥有{{user.sex == 1?"老婆":"老公"}}一枚,{{user.sex == 1?"她":"他"}}叫{{loveUser.userName}}</span>
        </el-form-item>
        <el-form-item label="我的Love-Lock:" :label-width="formLabelWidth">
          {{user.myLoveLock}}
        </el-form-item>
        <el-form-item v-if="!user.single" label="另一半的Love-Lock:" :label-width="formLabelWidth">
          {{user.loveLock}}
          <el-button type="danger" @click="unLinkLove" plain size="small" style="margin-left: 1rem">解绑</el-button>
        </el-form-item>
        <el-form-item v-else label="绑定另一半的Love-Lock" :label-width="formLabelWidth">
          <el-input v-model="loveLock"></el-input>
          <el-button type="primary" @click="linkLove" plain size="small" style="margin-left: 1rem">绑定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import weather from "@/components/commons/weather";
  import showStatus from "@/components/commons/showStatus";
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    name: "notePage",
    data() {
      return {
        indexIcon: require("@/assets/images/aixin.png"),
        userEditor: false,
        formLabelWidth: "150px",
        loveLock: "",
        fileData: {
        },
        rules: {
          birth: [{
            type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change"
          }]
        }
      };
    },
    created() {
      this.$initSoket();
      this.getLoveNumber(this.user);
    },
    computed: {
      ...mapState({
        user: state => state.user,
        loveUser: state => state.loveUser
      })
    },
    methods: {
      getLoveNumber(user) {
        this.$http
          .get("/love/getLoveNumber", {
            userId: user.userId
          })
          .then(response => {
            if (response.flag) {
              this.$store.commit("changeLoveNumber", response.data.data);
            }
          })
          .catch(error => {
            reject(error);
          });
      },
      handleCommand(command) {
        switch (command) {
          case "1":
            this.showUserEditor();
            break;
          case "2":
            break;
          default:
            break;
        }
      },
      showUserEditor() {
        this.userEditor = true;
      },
      modifyAvatar() {},
      modifyDate() {},
      linkLove() {},
      unLinkLove() {}
    },
    components: {
      weather,
      showStatus
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
