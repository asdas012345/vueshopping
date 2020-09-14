<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 16:36:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-03 22:22:29
-->
<template>
  <div class="box">
    <header class="header">购物车头部</header>
    <div class="content">
      <van-notice-bar
        color="#1989fa"
        v-if="cartlist.length>0"
        background="#ecf9ff"
        left-icon="info-o"
        mode="closeable"
        text="左滑删除商品。"
      />
      <van-empty description="购物车空空如也" v-if="cartlist.length === 0">
        <van-button round type="danger" class="bottom-button" @click="$router.push('/kind')">去选购</van-button>
      </van-empty>
      <van-swipe-cell v-else v-for="(item,index) of cartlist" :key="item.proid">
        <van-card
          :price="item.price"
          :title="item.proname"
        >
        <template #thumb>
          <van-checkbox v-model="item.flag" @click="changeItemFlag(item)"></van-checkbox>
          <van-image :src="item.proimg" @click="$router.push(`/detail/${item.proid}`)"></van-image>
        </template>
          <template #num>
            <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="changeNum(item)"/>
          </template>
        </van-card>
        <template #right>
          <van-button square type="danger" text="删除" class="delete-button" @click="deleteCart(item.cartid,index)"/>
        </template>
      </van-swipe-cell>
         <van-submit-bar v-if="cartlist.length > 0" :disabled=" totalNum === 0 " :price="totalPrice*100" :button-text="'去结算('+totalNum+')'" @submit="onSubmit">
           <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Card, Button, Stepper, Empty, SubmitBar, Checkbox, SwipeCell, NoticeBar, Toast, Dialog, Image as VanImage } from 'vant'
import { deleteCartData, updateCartNum, updateAllFlag, updateFlag } from '@/api'
import { orderAdd } from '@/api/order'
import { mapState, mapActions } from 'vuex'
Vue.use(Card)
Vue.use(Button)
Vue.use(Stepper)
Vue.use(Empty)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(SwipeCell)
Vue.use(NoticeBar)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(VanImage)
export default {
  data () {
    return {
      checked: false
    }
  },
  computed: {
    ...mapState({
      // cartlist:(state)=>{ return state.cart.cartlist }
      // cartlist:(state)=>( state.cart.cartlist )
      cartlist: ({ cart: { cartlist } }) => cartlist
    // loginState:({ user:{loginState}})=>loginState
    }),
    totalNum () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0
      }, 0)
    },
    totalPrice () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num * item.price : sum + 0
      }, 0)
    }
  },
  methods: {
    changeItemFlag (item) {
      updateFlag({
        cartid: item.cartid,
        checked: item.flag
      }).then(() => {
        if (item.flag) {
        // every函数任何一个数值返回false就是false，全部返回true就是true
        // 当前被选中，判断其余的有没有都被选中
          const test = this.cartlist.every(item => {
            return item.flag
          })
          // 如果其余的也被选中
          if (test) {
            this.checked = true
          } else {
            this.checked = false
          }
        } else {
          this.checked = false
        }
      })
    },
    selectAll () {
      updateAllFlag({
        userid: localStorage.getItem('userid'),
        checked: this.checked
      }).then(res => {
        if (this.checked) {
          const arr = this.cartlist
          arr.forEach(item => {
            item.flag = true
          })
          this.$store.commit('cart/change_cart_list', arr)
        } else {
          const arr = this.cartlist
          arr.forEach(item => {
            item.flag = false
          })
          this.$store.commit('cart/change_cart_list', arr)
        }
      })
    },
    onSubmit () {
      // item.flag为真，返回那个item进arr
      const arr = this.cartlist.filter(item => (item.flag))
      orderAdd({
        list: arr
      }).then(res => {
        this.$router.push('/order/' + res.data.data)
      })
    },
    deleteCart (cartid, index) {
      Dialog.confirm({
        message: '确认删除吗'
      }).then(() => {
        deleteCartData({ cartid }).then(res => {
          if (res.data.code === '200') {
            Toast('删除成功')
            const arr = this.cartlist
            arr.splice(index, 1)
            this.$store.commit('cart/change_cart_list', arr)
            const allflag = this.cartlist.every(item => item.flag)
            this.checked = allflag
          }
        })
      }).catch(() => {
      })
    },
    changeNum (item) {
      updateCartNum({
        cartid: item.cartid,
        num: item.num
      }).then(res => {
        if (res.data.code === '200') {
          Toast('更新购物车成功')
        }
      })
    },
    ...mapActions({
      getCartData: 'cart/getCartData'
      // 组件中访问 this.change_cart_list() 相当于执行了 this.$store.commit('/cart/change_cart_list')
    })
  },

  mounted () {
    // getCartData({
    //   userid: localStorage.getItem('userid')
    // }).then(res => {
    //   // this.cartlist = res.data.data
    //   // this.$store.commit('cart/change_cart_list',res.data.data)
    //   this.change_cart_list(res.data.data)
    //   // 实时获取 列表状态 推算全选的默认值
    //   this.checked = this.cartlist.every(item => {
    //     return item.flag
    //   })
    // })
    // if(!this.loginState){
    //   this.$router.push('/login')
    // }
    this.getCartData(localStorage.getItem('userid')).then(() => {
      this.checked = this.cartlist.every(item => {
        return item.flag
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.bottom-button{
  width:160px;
  height:40px;
}
.van-submit-bar{
  bottom:0.5rem
}
.delete-button{
  height:100%
}
.van-card__thumb{
  width:128px;
  display:flex;
  .van-checkbox{
    width:40px;
  }
  .van-image{
    width:88px;
  }
}
</style>
