<template>
  <div>
    <el-card :body-style="{padding: '0px'}" class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="head_div">
          <span class="weather">天气</span>
          <el-tooltip style="font-size: 0.8rem;" effect="dark" content="点击刷新天气" placement="top">
            <el-button type="text" class="location" @click="changeCity">
              <i class="icon iconfont icon-weizhi" @click="changeCity"/>
              {{ city }}
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div>
        <el-carousel :interval="10000" height="12rem" indicator-position="none">
          <el-carousel-item v-for="(item,index) in weatherData" :key="index">
            <div class="item_div">
            <i class="icon iconfont icon-shijian"/> {{ item.date }} {{ item.week }} {{ item.day }}</div>
            <div class="item_div">{{ item.wea }}</div>
            <div class="item_div"><i class="icon iconfont icon-fengli"/> {{ item.tem2 }}~{{ item.tem1 }} {{ item.win[0] }}
              {{ item.win_speed }}</div>
            <div v-if="item.air" class="item_div"><i class="icon iconfont icon-kongqizhiliang"/> 空气指数:{{ item.air }}
              空气质量:{{ item.air_level }}</div>
          </el-carousel-item>
        </el-carousel>
        <div style="height: 1.8rem;display: flex">
          <span class="update-time">更新时间: {{ updataTime }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Weather',
  data() {
    return {
      city: '',
      updataTime: '',
      weatherData: ''
    }
  },
  created() {
    this.changeCity()
  },
  methods: {
    changeCity() {
      axios({
        method: 'get',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'https://www.tianqiapi.com/api/',
        params: {
          version: 'v1',
          ip: returnCitySN['cip']
        }
      }).then(response => {
        this.city = response.data.city
        this.weatherData = response.data.data
        this.updataTime = response.data.update_time
        this.$notify({
          title: '系统通知',
          message: '天气加载成功',
          type: 'success',
          position: 'bottom-right'
        })
      }).catch(error => {
        console.log(error)
        this.$notify({
          title: '系统通知',
          message: '天气加载失败',
          type: 'error',
          position: 'bottom-right'
        })
      })
    }
  }
}
</script>

<style scoped>
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
    width: 16rem;
    background-color: #f2f2f0;
  }

  .head_div {
    display: flex;
    justify-content: space-between;
    margin: -6px 0;
  }

  .weather {
    font-size: 1rem;
    margin-top: auto;
    margin-bottom: auto
  }

  .location {
    font-size: 0.6rem;
    color: #303133;
  }

  .item_div {
    font-size: 0.8rem;
    margin-top: 1rem
  }

  .update-time {
    font-size: 0.3rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: 1rem;
  }
</style>
