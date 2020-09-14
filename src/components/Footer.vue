<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-19 19:12:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-02 20:10:08
-->
<template>
    <footer class="footer">
        <ul>
          <router-link to='/home' tag='li' activeClass="active">
            <span class="iconfont icon-home"></span>
            <p>首页</p>
          </router-link>
          <router-link to='/kind' tag='li' activeClass="active">
            <span class='iconfont icon-category'></span>
            <p>分类</p>
          </router-link>
          <router-link to='/cart' tag='li' activeClass="active">
            <span class='iconfont icon-cart'></span>
            <p>购物车{{ totalNum }}</p>
          </router-link>
          <router-link to='/user' tag='li' activeClass="active">
            <span class='iconfont icon-me'></span>
            <p>我的</p>
          </router-link>
        </ul>
    </footer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalNum: 'totalNum'
    })
  },
  methods: {
    ...mapActions({
      getCartData: 'cart/getCartData'
    })
  },
  mounted () {
    this.getCartData(localStorage.getItem('userid'))
  }
}
</script>
