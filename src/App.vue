<template>
  <div id="app" style="position:absolute; left:0; top:0; width:100%;height:100%;">
    <router-view></router-view>
  </div>
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
