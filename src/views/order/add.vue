<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-26 20:26:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-27 14:37:06
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="添加地址" left-arrow @click-left="$router.back()"></van-nav-bar>
    </header>
    <div class="content">
        <van-address-edit
            :area-list="areaList"
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, AddressEdit, Toast } from 'vant'
import areaList from '@/utils/area'
import { addressAdd, updateOrderAddress } from '@/api/order'
Vue.use(NavBar)
Vue.use(AddressEdit)
Vue.use(Toast)
export default {
  data () {
    return {
      areaList
    }
  },
  methods: {
    onSave (content) {
      content.userid = localStorage.getItem('userid')
      const address =
      content.province === content.city
        ? content.province + content.addressDetail
        : content.province + content.city + content.addressDetail
      addressAdd(content).then(res => {
        Toast('插入地址成功')
        // 更新订单中的地址
        console.log(res.data)
        updateOrderAddress({
          userid: localStorage.getItem('userid'),
          time: this.$route.params.time,
          name: content.name,
          tel: content.tel,
          address
        }).then(() => {
          this.$router.go(-2)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
