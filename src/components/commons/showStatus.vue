<template>
  <div class="parent_card">
    <el-card class="box-card" shadow="never" style="border-right: 0" :body-style="{padding: '0px'}">
      <div slot="header" class="clearfix">
          <i class="el-icon-circle-check-outline online" style="margin-right: 0.5rem;"></i>
          <i v-if="user.sex == 1" class="icon iconfont icon-boy"></i>
          <i v-else class="icon iconfont icon-girl"></i>
          <span>{{user.userName}}</span>
      </div>
      <div class="card_body">
        <el-badge v-if="!user.single" :value="myloveNumber" class="item card_item" type="info">
          <el-button :class="getBackgroundColor(user)" size="small">爱值</el-button>
        </el-badge>
        <el-rate allow-half disabled class="card_item" :max=6 v-if="!user.single" v-model="myloveNumber" :icon-classes="['icon iconfont icon-love', 'icon iconfont icon-love', 'icon iconfont icon-love']" disabled-void-icon-class="icon iconfont icon-love" disabled-void-color="#909399" :low-threshold=2 :high-threshold=4 :colors="['#409EFF', '#67C23A', '#F56C6C']">
        </el-rate>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="border-left: 0" :body-style="{padding: '0px'}">
      <div slot="header" class="clearfix">
          <i v-if="loveUser.sex == 1 && !user.single" class="icon iconfont icon-boy"></i>
          <i v-else-if="!user.single" class="icon iconfont icon-girl"></i>
          <span v-if="!user.single">{{loveUser.userName}}</span>
          <span v-else>你是个单身狗</span>
          <transition name="el-fade-in-linear">
            <i v-if="loveUserOnline" class="el-icon-circle-check-outline online" style="margin-left: 0.5rem"></i>
            <i v-else class="el-icon-circle-close-outline outline" style="margin-left: 0.5rem"></i>
          </transition>
        </div>
      <div class="card_body">
        <el-badge v-if="!user.single" :value="loveNumber" class="item card_item" type="info">
          <el-button :class="getBackgroundColor(loveUser)" size="small">爱值</el-button>
        </el-badge>
        <el-rate allow-half disabled class="card_item" :max=6 v-if="!user.single" v-model="loveNumber" :icon-classes="['icon iconfont icon-love', 'icon iconfont icon-love', 'icon iconfont icon-love']" disabled-void-icon-class="icon iconfont icon-love" disabled-void-color="#909399" :low-threshold=2 :high-threshold=4 :colors="['#409EFF', '#67C23A', '#F56C6C']">
        </el-rate>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "showStatus",
  data() {
    return {
      loveText: ["小有倾心", "两情浓浓", "如胶似膝", "生死绵绵", "永生永世"]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      loveUser: state => state.loveUser,
      loveUserOnline: state => state.loveUserOnline,
      myloveNumber: state => state.myloveNumber,
      loveNumber: state => state.loveNumber
    })
  },
  methods: {
    getOnlineColor() {
      
    }
  },
};
</script>

<style scoped>
.parent_card {
  width: 16rem;
  display: flex;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  padding: 0rem;
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 8rem;
  background-color: #f2f2f0;
  font-size: 0.8rem;
}
.card_body {
  height: 10rem;
}
.card_item {
  margin-top: 1rem;
}
.online {
  color: #409EFF
}
.outline {
  color: #F56C6C
}
</style>