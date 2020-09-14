<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-26 17:40:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-29 15:25:01
-->
<template>
    <div class="box">
        <header class="header">
            <van-nav-bar title="确认订单" left-arrow @click-left="back"></van-nav-bar>
        </header>
        <div class="content">
            <van-cell v-if="flag" center :title="'收货人:'+name" :label="'收货地址:'+address+'   手机号:'+tel" is-link
            @click='toOrderlist'/>
            <van-cell v-else center title="添加收货地址" icon="location-o" is-link @click='toOrderlist'/>
            <div class="bottom"></div>
            <van-card
            v-for="item of orderlist"
            :key="item.orderid"
            :num="item.num"
            :price="item.price"
            :title="item.proname"
            :thumb="item.proimg"/>
            <van-submit-bar :price="totalPrice" :disabled="!flag"  :button-text="'去支付('+totalNum+')'" @submit="pay" />
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Cell, Card, SubmitBar, Dialog } from 'vant'
import { confirmOrderInfo, getDefaultAddress, updateOrderAddress, deleteCartData, pay } from '@/api/order'
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(Card)
Vue.use(SubmitBar)
Vue.use(Dialog)
export default {
  data () {
    return {
      flag: true,
      orderlist: [],
      name: '',
      tel: '',
      address: '',
      defaultData: [] // 默认收货人信息
    }
  },
  computed: {
    totalNum () {
      return this.orderlist.reduce((sum, item) => {
        return sum + item.num
      }, 0)
    },
    totalPrice () {
      return this.orderlist.reduce((sum, item) => {
        return sum + item.num * item.price
      }, 0) * 100
    }
  },
  mounted () {
    // 确认订单的列表信息
    confirmOrderInfo({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      this.orderlist = res.data.data
      // 有地址的订单
      if (this.orderlist[0].tel !== '') {
        this.name = this.orderlist[0].name
        this.tel = this.orderlist[0].tel
        this.address = this.orderlist[0].address
      } else {
        // 没有地址的订单
        // 请求默认地址，如果有显示默认地址。如果没有显示刚添加的地址
        // 确认默认地址
        getDefaultAddress({
          userid: localStorage.getItem('userid')
        }).then(res => {
          if (res.data.data.length === 0) {
            // 没有默认地址
            this.flag = false
          } else {
            const address =
                  res.data.data[0].province === res.data.data[0].city
                    ? res.data.data[0].province + res.data.data[0].county + res.data.data[0].addressDetail
                    : res.data.data[0].province + res.data.data[0].city + res.data.data[0].county + res.data.data[0].addressDetail
            this.flag = true
            this.defaultData = res.data.data
            this.name = res.data.data[0].name
            this.tel = res.data.data[0].tel
            this.address = address
          }
        })
      }
    })
  },
  methods: {
    deleteData () {
      deleteCartData({
        userid: localStorage.getItem('userid')
      }).then(res => {
        // 跳转至支付页面
        // this.$router.replace('/pay?body=' + this.orderlist.length + '件商品&total_fee=' + this.totalPrice + '&out_trade_no=' + this.$route.params.time)
        pay({
          body: this.orderlist.length + '件商品',
          total_fee: this.totalPrice,
          out_trade_no: this.$route.params.time
        }).then(res => {
          console.log('res', res)
          localStorage.setItem('url', res.data.url)
          this.$router.replace('/pay')
        })
      })
    },
    changeAddress () {
      this.$router.push('/orderaddresslist/' + this.$route.params.time)
    },
    back () {
      Dialog.confirm({
        message: '便宜不等人，请三思而后行',
        theme: 'round'
      }).then(() => {
        this.$router.back()
      }).catch(() => {

      })
    },
    pay () {
      console.log('去支付')
      // 判断有没有订单地址，没有同步默认地址
      if (this.orderlist[0].tel === '') {
        // 同步默认地址，删除购物车的数据，跳转到支付页面
        const address = this.defaultData[0].province === this.defaultData[0].city
          ? this.defaultData[0].province + this.defaultData[0].county + this.defaultData[0].addressDetail
          : this.defaultData[0].province + this.defaultData[0].city + this.defaultData[0].county + this.defaultData[0].addressDetail
        const { name, tel } = this.defaultData[0]
        updateOrderAddress({
          userid: localStorage.getItem('userid'),
          time: this.$route.params.time,
          name,
          tel,
          address
        }).then(res => {
          // 删除购物车的数据，跳转到支付页面
          this.deleteData()
        })
      } else {
        // 有订单地址，删除购物车数据，跳转到支付页面
        this.deleteData()
      }
    },
    toOrderlist () {
      this.$router.push('/orderaddresslist/' + this.$route.params.time)
    }
  }
}
</script>
<style lang='scss' scoped>
.bottom {
  width: 100%;
  height: 5px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vSmprjS8vGNjfjDw/vd3f7w8O57e0EOI68AAABSSURBVCjPY2CAAE4l7GACVJ4hUBArEIXJL8KuXw0mz4xdv2ABVJ77EHYDGmAGmGDXLwKT58CuX2cDTIEjdgOcYfJJ2A3Qgsmz4/CBwWgQUiMIAXzCOFELLk/nAAAAAElFTkSuQmCC') center repeat-x;
}
</style>
