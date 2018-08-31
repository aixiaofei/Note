<template>
  <div id="app" style="position:absolute; left:0; top:0; width:100%;height:100%;">
    <el-container>
      <el-header class="head" height="10rem">
        <div style="margin:auto;color:white;margin-left:3rem;display:flex">
          <img :src="indexIcon" style="height:4rem;width:4rem;margin:auto"/>
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
  name: "App",
  data() {
    return {
      indexIcon:require('@/assets/images/bianqian.png'),
    }
  },
  components: {
    weather
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.head {
  background-color: #2c3e50;
  display: flex;
}
</style>
