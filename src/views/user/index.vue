<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 16:36:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-03 22:00:14
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="个人中心">
        <template #right>
          <van-icon name="setting-o" size="24" @click="jump"></van-icon>
        </template>
      </van-nav-bar>
    </header>
    <div class="content">
      <div class="imgbox">
        <div class="img">
          <van-image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        </div>
        <div class="info">
          <h3>陆嘉靖</h3>
          <p>超级会员</p>
        </div>
      </div>
      <van-grid>
        <van-grid-item icon="photo" text="待付款"></van-grid-item>
        <van-grid-item icon="photo" text="待收货"></van-grid-item>
        <van-grid-item icon="photo" text="待评价"></van-grid-item>
        <van-grid-item icon="photo" text="我的订单"></van-grid-item>
      </van-grid>
      <van-cell title="我的地址" is-link></van-cell>
      <van-cell title="我的收藏" is-link></van-cell>
      <van-cell title="我的足迹" is-link></van-cell>
      <van-cell title="我的优惠卷" is-link></van-cell>
      <van-cell title="我的消息" is-link>
        <template #default>
          <van-tag round type="danger">1</van-tag>
        </template>
      </van-cell>
      <van-cell title="关于我们" is-link></van-cell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Button, Image as VanImage, Grid, GridItem, Cell, Tag, Icon } from 'vant'
Vue.use(NavBar)
Vue.use(Button)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Tag)
Vue.use(Icon)
export default {
  methods: {
    jump () {
      this.$router.push('/setpwd')
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   if (localStorage.getItem('loginState') === 'true') {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.imgbox {
  padding: 30px 20px;
  display: flex;
  .info {
    padding: 10px 5px;
    flex: 1;
    margin-left: 30px;
    p {
      margin: 8px 0;
      color: #999;
    }
  }
}
</style>
