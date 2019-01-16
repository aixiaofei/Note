<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"><i class="icon iconfont icon-shuidi span_icon"/>爱情点滴</span>
        <loveLittle/>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="icon iconfont icon-cangku span_icon"/>爱情仓库</span>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i class="icon iconfont icon-guiji span_icon"/>爱情轨迹</span>
      </el-tab-pane>
      <el-tab-pane label="爱情到永远" name="fourth"/>
    </el-tabs>
  </div>
</template>

<script>
import loveLittle from '@/views/little/loveLittle'
export default {
  name: 'LoveContent',
  components: {
    loveLittle
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick() {
    }
  }
}
</script>

<style scoped>
.span_icon {
  margin-right: 0.3rem;
}
</style>
