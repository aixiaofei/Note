<template>
<<<<<<< HEAD
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
        <el-main style="margin-top:3rem;margin-left:5rem;margin-right:3rem;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
=======
  <router-view></router-view>
>>>>>>> 9fd0ecd93f5ad0a335bbbc5d0a0837421cbef88c
</template>

<script>
export default {
  name: "App",
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
