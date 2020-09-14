<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 16:36:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-05 22:32:49
-->

<template>
  <div class="box">
    <header class="header">
      <ul>
        <li class="left">
          <span class="iconfont icon-category"></span>
        </li>
        <li class="center">
          <div class="search" @click="$router.push('/search')">搜索商品</div>
        </li>
        <li class="right" @click="$router.push('/login')">
          登录
        </li>
      </ul>
    </header>
    <div class="content" id="content" ref="content">
      <van-swipe  class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <van-image :src="item.img" />
          </van-swipe-item>
      </van-swipe>
      <Nav></Nav>
      <!-- <van-card
     v-for='item of prolist'
     :key="item.proid"
     :price="item.price"
     :desc="item.desc"
     :title="item.proname"
     :thumb="item.proimg">
      </van-card>-->

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <Prolist :prolist="prolist"></Prolist>
        </van-list>
      </van-pull-refresh>
      <div class="backtop" @click="backtop">
        <van-icon name="back-top" size="26"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Image as VanImage,
  List,
  PullRefresh,
  Icon
} from 'vant'
import { getBannerData, getProData } from './../../api'
import Nav from './Nav'
import Prolist from './Prolist'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)

export default {
  data () {
    return {
      bannerlist: [],
      prolist: [],
      count: 2, // 默认加载了第一页的数据---更具后端的接口设定
      isLoading: false, // 下拉刷新
      loading: false, // 默认不加载
      finished: false, // 默认数据没有完全加载完毕 ,=true那就不可能继续上拉加载
      flag: false
    }
  },
  methods: {
    // 上拉加载事件
    onLoad () {
      this.loading = true // 表示现在正在加载状态
      console.log(this.count)
      getProData({
        limit: 10,
        count: this.count
      }).then(res => {
        this.loading = false
        this.count++
        if (res.data.data.length === 0) {
          this.finished = true
        } else {
          this.prolist = [...this.prolist, ...res.data.data]
        }
      })
    },
    // 下拉刷新
    onRefresh () {
      this.isLoading = true
      console.log('haha')
      getProData().then(res => {
        this.prolist = res.data.data
        this.count = 2
        this.finished = false
        this.isLoading = false
      })
    },
    backtop () {
      // 谁产生了滚动条----content
      // console.log(document.getElementById('content') === this.$refs.content)
      this.$refs.content.scrollTop = 0
    },
    scrollFn () {
      // console.log(this.$refs.content.scrollTop)
      // 滚动时记录滚动条的位置
      localStorage.setItem('top', this.$refs.content.scrollTop)
      if (this.$refs.content.scrollTop > 300) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  // 保留组件的状态，不会发出销毁和重建，处罚的是activated和deactivated钩子
  activated () {
    this.$refs.content.scrollTop = localStorage.getItem('top')
  },
  // mounted () {
  //   getBannerData().then(res => {
  //     console.log(res.data.data)
  //     this.bannerlist = res.data.data
  //   })
  //   getProData().then(res => {
  //     this.prolist = res.data.data
  //     this.$refs.content.addEventListener('scroll', this.scrollFn)
  //   })
  // },
  async mounted () {
    const res1 = await getBannerData()
    const res2 = await getProData()
    this.bannerlist = res1.data.data
    this.prolist = res2.data.data
    this.$refs.content.addEventListener('scroll', this.scrollFn)
  },
  beforeDestroy () {
    console.log('销毁之前移除事件监听')
    this.$refs.content.removeEventListener('scroll', this.scrollFn)
  },
  components: {
    Nav,
    Prolist
  }
}
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  height: 1.5rem;
}
.backtop{
  position:fixed;
  bottom:60px;
  right:10px;
  z-index:999;
  width:30px;
  height:30px;
  background-color:#fff;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.header{
  ul{
    height:100%;
    display:flex;
    li{
      height:100%;
      display: flex;
      justify-content:center;
      align-items: center;
      &:nth-child(1),&:nth-child(3){
        width:50px;
        color:#fff;
      }
      &:nth-child(2){
        flex:1;
        .search{
          width:100%;
          height:.3rem;
          background-color:#fff;
          color:#666;
          padding-left:12px;
          line-height:.3rem;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
