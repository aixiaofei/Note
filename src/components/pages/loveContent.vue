<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label"><i class="icon iconfont icon-shuidi span_icon"></i>爱情点滴</span>
                <loveLittle></loveLittle>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label"><i class="icon iconfont icon-cangku span_icon"></i>爱情仓库</span>
            </el-tab-pane>
            <el-tab-pane name="third">
                <span slot="label"><i class="icon iconfont icon-guiji span_icon"></i>爱情轨迹</span>
            </el-tab-pane>
            <el-tab-pane label="爱情到永远" name="fourth">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import loveLittle from "@/components/pages/little/loveLittle";
export default {
  name: "loveContent",
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
      handleClick() {
          
      }
  },
  components: {
    loveLittle
  }
};
</script>

<style scoped>
.span_icon {
  margin-right: 0.3rem;
}
</style>