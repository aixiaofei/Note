<template>
  <div>
    <el-card class="box-card" shadow="hover" :body-style="{padding: '0px'}">
      <div slot="header" class="clearfix">
        <div class="head-div">
          <span class="weather">天气</span>
          <el-tooltip style="font-size:0.8rem;" effect="dark" content="点击刷新天气" placement="top">
            <div class="location" @click="changeCity">
              <i style="margin-right:-0.25rem;" class="icon iconfont icon-weizhi"></i>
              <el-button type="text" style="color:black;">{{city}}</el-button>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div>
        <el-carousel height="14rem">
          <el-carousel-item v-for="(item,index) in weatherDataFull" :key="index">
            <div>
              <div class="item-div">
                <span style="margin:auto;">{{weatherDataFull[index].date}} {{item.des}} {{item.low}}℃-{{item.high}}℃ {{item.wind_direction}}风</span>
              </div>
              <div class="item-div">
                <span class="item-span">
                  <span style="margin:auto;">白天天气:{{item.text_day}}</span>
                  <img v-bind:src="item.src_day" class="img" /></span>
              </div>
              <div class="item-div">
                <span class="item-span">
                  <span style="margin:auto;">夜晚天气:{{item.text_night}}</span>
                  <img v-bind:src="item.src_night" class="img" /></span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div style="background-color: rgb(112, 161, 159);height:1.8rem;display:flex">
          <span class="update-time">更新时间:{{updataTime}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store";
import { mapState, mapMutations } from "vuex";

export default {
  name: "weather",
  created() {
    this.$store.commit("changeCity");
  },
  data() {
    return {};
  },
  computed: {
    city() {
      return this.$store.state.city;
    },
    updataTime() {
      return this.$store.state.updataTime;
    },
    weatherData() {
      return this.$store.state.weatherData;
    },
    dateDes() {
      return this.$store.state.dateDes;
    },
    weatherDataFull: function() {
      var i = 0;
      for (let item of this.weatherData) {
        let buf = {
          des: this.dateDes[i],
          src_day: require(`@/assets/weatherIcon/${item.code_day}.png`),
          src_night: require(`@/assets/weatherIcon/${item.code_night}.png`)
        };
        item = Object.assign(item, buf);
        i++;
      }
      return this.weatherData;
    }
  },
  methods: mapMutations(["changeCity"]),
  store
};
</script>

<style scoped>
.img {
  margin: auto;
  height: 4rem;
  width: 4rem;
  margin-left: 1rem;
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
  width: 20rem;
}
.weather {
  margin: auto;
  font-size: 1rem;
  margin-left: 1rem;
}
.location {
  font-size: 0.8rem;
  margin: auto;
  margin-right: 1rem;
  margin-bottom: 0.8rem;
}
.item-div {
  height: 4rem;
  display: flex;
  font-size: 0.8rem;
}
.head-div {
  height: 4rem;
  display: flex;
  margin:-1.1rem -1.1rem; 
  background: rgb(112, 161, 159);
}
.item-span {
  display: flex;
  margin: auto;
}
.el-carousel__item:nth-child(n) {
  background-color: rgb(112, 161, 159);
}
.update-time {
  font-size: 0.3rem;
  color: white;
  margin: auto;
  margin-right: 1rem;
}
</style>