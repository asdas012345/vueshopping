<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-13 21:39:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-29 15:41:54
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="支付"
      left-arrow
      @click="back"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-image :src='url'/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Dialog, Image as VanImage } from 'vant'
Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(VanImage)
export default {
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = localStorage.getItem('url')
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '返回将中断本次支付，需要去订单中心继续支付',
        theme: 'round'
      }).then(() => {
        this.$router.back()
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  .van-image{
    width: 200px;
    height: 200px;
  }
}
</style>
