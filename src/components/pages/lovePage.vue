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
            <el-dropdown>
              <span class="el-dropdown-link">{{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="17%">
          <showStatus style="margin-top:2rem;margin-left:1rem"></showStatus>
          <weather style="margin-top:2rem;margin-left:1rem"></weather>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import weather from "@/components/commons/weather";
import showStatus from "@/components/commons/showStatus";
import { mapState, mapMutations } from "vuex";
export default {
  name: "notePage",
  data() {
    return {
      indexIcon: require("@/assets/images/aixin.png")
    };
  },
  created() {
    this.$initSoket();
    this.getLoveNumber(this.user);
  },
  computed: {
    ...mapState({
      user: state => state.user
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
    }
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
.el-dropdown {
  margin-top: 1.2rem;
}
</style>