<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-26 20:26:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-02 23:07:14
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="选择地址" left-arrow @click-left="$router.back()"></van-nav-bar>
    </header>
    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="selectItem"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, AddressList, Toast } from 'vant'
import { getAddressList, updateOrderAddress } from '@/api/order'
Vue.use(NavBar)
Vue.use(AddressList)
Vue.use(Toast)
export default {
  data () {
    return {
      chosenAddressId: '0',
      list: []
    }
  },
  methods: {
    onAdd () {
      Toast('新增地址')
      this.$router.push('/orderaddressadd/' + this.$route.params.time)
    },
    onEdit (item, index) {
      // DeleteAddress({
      //   addressid:item.addressid
      // }).then(()=>{
      // })

    },
    selectItem (item, index) {
      item.userid = localStorage.getItem('userid')
      item.time = this.$route.params.time
      updateOrderAddress(item).then(res => {
        this.$router.back()
      })

      getAddressList({
        userid: localStorage.getItem('userid'),
        time: this.$route.params.time,
        addressid: item.addressid
      }).then(() => {
      })
    }
  },
  mounted () {
    getAddressList({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      console.log(res.data.data)
      res.data.data.forEach((item, index) => {
        item.address =
        item.province === item.city
          ? item.province + item.addressDetail
          : item.province + item.city + item.addressDetail
        item.id = index.toString()
        // 如果当前为默认的值
        if (item.isDefault) {
          this.chosenAddressId = item.id
        } else {
          this.chosenAddressId = '0'
        }
      })
      this.list = res.data.data
      console.log(this.list.addressid)
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
