<template>
    <div id="app" class="parent_div">
        <el-container>
            <el-header class="head" height="8rem">
                <div style="margin:auto;color:white;margin-left:3rem;display:flex">
                    <img :src="indexIcon" style="height:3.5rem;width:3.5rem;margin:auto" />
                    <span style="font-size:2rem;margin:auto;margin-left:1rem">简单便签</span>
                </div>
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
export default {
  name: "notePage",
  data() {
    return {
      indexIcon: require("@/assets/images/bianqian.png")
    };
  },
  components: {
    weather
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
</style>