<template>
    <div id="app" class="parent_div">
        <el-container>
            <el-header class="head" height="8rem">
                <div class="head_div">
                    <img :src="indexIcon" class="head_div_img" />
                    <span class="head_div_span">简单便签</span>
                </div>
                <el-button type="text" style="color: white">{{user.userName}}</el-button>
            </el-header>
            <el-container>
                <el-aside width="25rem">
                    <weather style="margin-top:5rem;margin-left:3rem;"></weather>
                </el-aside>
                <el-main style="margin-top:4rem;margin-left:2rem;margin-right:3rem;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import weather from "@/components/commons/weather";
import store from "@/vuex/common";
import { mapState, mapMutations } from "vuex";
export default {
  name: "notePage",
  data() {
    return {
      indexIcon: require("@/assets/images/bianqian.png")
    };
  },
  computed: {
    user() {
      return this.$store.state.user 
    }
  },
  components: {
    weather
  },
  store
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
.head_div {
  color: white;
  margin-left: 3rem;
  display: flex;
}
.head_div_img {
  height: 3.5rem;
  width: 3.5rem;
  margin: auto;
}
.head_div_span {
  font-size: 2rem;
  margin: auto;
  margin-left: 0.6rem;
}
</style>