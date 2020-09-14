<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-19 19:09:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-05 23:27:38
-->onChange
<template>
  <div class="box">
    <div class="content" ref="content">
      <van-nav-bar
        v-if="changetitle"
        title="标题"
        left-arrow
        @click-left="$router.back()"
        @click-right="showShare=true"
      >
        <template #right>
          <van-icon name="weapp-nav" size="20" />
        </template>
      </van-nav-bar>

        <van-tabbar  v-else class="van-nav-bar" v-model="changetab">
          <van-tabbar-item name="pro" @click="toPro">商品</van-tabbar-item>
          <van-tabbar-item name="comment" @click="toComment">评价</van-tabbar-item>
          <van-tabbar-item name="detail" @click="toDetail">详情</van-tabbar-item>
          <!-- <van-tabbar-item name="recommend" @click="toRecommend">推荐</van-tabbar-item> -->
        </van-tabbar>

        <van-empty v-if="flag" image="search" description="抱歉，没有查找到该产品" />
        <div class="detailcontent" v-else>
          <van-swipe class="detail-swipe" @change="onChange">
            <van-swipe-item
              v-for="(item,index) of detailBannerlist"
              :key="index"
              @click="previewImg"
            >
              <van-image :src="item" />
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">{{current+1}}/{{detailBannerlist.length}}</div>
            </template>
          </van-swipe>
          <div class="info">
            <div class="price">￥{{proObj.price}}</div>
            <div class="title">
              <h3>
                <van-tag type="danger">{{ proObj.brand }}</van-tag>
                -{{ proObj.proname }}
              </h3>
            </div>
            <div class="desc van-multi-ellipsis--l3">{{ proObj.desc }}</div>
          </div>
          <div class="comment" ref="comment">
            评价
          </div>
          <div class="detail" ref="detail">
            详情
          </div>
          <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" @click="chat" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" :badge="totalNum"/>
            <van-goods-action-icon :icon="star"  :text="startext" color="#ff5000" @click="changeStar" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
            <van-goods-action-button type="danger" text="立即购买" @click="$router.push('/order')"/>
          </van-goods-action>
          <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options"></van-share-sheet>
        </div>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  NavBar,
  Icon,
  Empty,
  Swipe,
  SwipeItem,
  Image as VanImage,
  ImagePreview,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ShareSheet,
  Tag,
  Tabbar,
  TabbarItem,
  Toast
} from 'vant'
import { getProDetailData, addCart } from '@/api'
import { mapActions, mapGetters, mapState } from 'vuex'
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(ImagePreview)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(ShareSheet)
Vue.use(Tag)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Toast)
export default {
  props: ['proid'],
  computed: {
    ...mapGetters({ totalNum: 'totalNum' }),
    ...mapState({ loginState: ({ user: { loginState } }) => loginState })
  },
  data () {
    return {
      star: 'star-o',
      startext: '未收藏',
      changetab: 'pro',
      changetitle: true,
      proidlist: [],
      proObj: {},
      flag: true,
      detailBannerlist: [
        'https://image.yunifang.com/yunifang/images/goods/10/goods_img/181119113049017182381279985.jpg',
        'https://image.yunifang.com/yunifang/images/goods/10/goods_img/181119113049017182381279985.jpg'
      ],
      current: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    // 客服
    chat () {
      window._MEIQIA('showPanel')
      window._MEIQIA('metadata', {
        name: '智子', // 美洽默认字段
        address: '半人马座阿尔法星', // 美洽默认字段
        aaa: 'bla bla bla', // 自定义字段
        xyz: 'lalala' // 自定义字段
      })
      window._MEIQIA('product', {
        picUrl: 'https://xxx/xxx.jpg',
        title: 'lujj-炸鸡音乐系统',
        description: '支持PC端/移动端/微信/APP/微博...等全渠道对话接入，稳定快速，无需下载部署，注册即用',
        productUrl: 'http://www.lujiajing.top:9000',
        salesCount: 123,
        success: data => {
          console.log(data, 'data')
        },
        error: error => {
          console.log(error, 'error')
        }
      })
    },
    changeStar () {
      const proid = this.$route.params.proid
      const proidlistStr = localStorage.getItem('proidlist') || '[]'
      const proidlist = JSON.parse(proidlistStr)
      const index = proidlist.indexOf(proid)
      if (this.star === 'star-o') {
        this.star = 'star'
        this.startext = '已收藏'
        proidlist.push(proid)
        localStorage.setItem('proidlist', JSON.stringify(proidlist))
      } else {
        this.star = 'star-o'
        this.startext = '未收藏'
        proidlist.splice(index, 1)
        localStorage.setItem('proidlist', JSON.stringify(proidlist))
      }
    },
    addCart () {
      if (!this.loginState) {
        this.$router.push('/login')
      }
      addCart({
        userid: localStorage.getItem('userid'),
        proid: this.proObj.proid,
        num: 1
      }).then(res => {
        if (res.data.code === '200') {
          Toast('加入购物车成功')
          // 从vuex中改变this.$store.state.cartlist
          this.getCartData(localStorage.getItem('userid'))
        }
      })
    },
    onChange (index) {
      this.current = index
    },
    previewImg () {
      ImagePreview({
        images: this.detailBannerlist,
        startPosition: this.current,
        onClose () {}
      })
    },
    scrollFn () {
      console.log(this.$refs.content.scrollTop)
      if (this.$refs.content.scrollTop > 150) {
        this.changetitle = false
      } else {
        this.changetitle = true
      }
    },
    toPro () {
      this.$refs.content.scrollTop = 0
    },
    toComment () {
      this.$refs.content.scrollTop = this.$refs.comment.offsetTop - 56
    },
    toDetail () {
      this.$refs.content.scrollTop = this.$refs.detail.offsetTop - 56
    },
    ...mapActions({
      getCartData: 'cart/getCartData'
    })
  },
  mounted () {
    window._MEIQIA('withoutBtn')
    window._MEIQIA('init')
    // console.log('proid',this.proid)
    // console.log(this.$route.params.proid)
    this.getCartData(localStorage.getItem('userid'))

    // const {
    //   params: { proid }
    // } = this.$route // 多重解构赋值

    getProDetailData({
      proid: this.proid
    }).then(res => {
      if (res.data.code === '10001') {
        this.flag = true
      } else {
        this.flag = false
        this.proObj = res.data.data
        this.detailBannerlist.unshift(this.proObj.proimg)
        this.$refs.content.addEventListener('scroll', this.scrollFn)

        const proidlistStr = localStorage.getItem('proidlist') || '[]'
        const proidlist = JSON.parse(proidlistStr)
        const index = proidlist.indexOf(this.proid)
        if (index === -1) {
          this.star = 'star-o'
          this.startext = '未收藏'
        } else {
          this.star = 'star'
          this.startext = '已收藏'
        }
      }
    })
  },
  beforeDestroy () {
    console.log('销毁之前移除事件监听')
    this.$refs.content.removeEventListener('scroll', this.scrollFn)
  }
}
</script>
<style lang="scss" scoped>
.content{
  padding-top:46px;
}
.detail-swipe {
  height: 3.75rem;
  overflow: hidden;
  .van-image{
    height:3.75rem;
    width:3.75rem;
  }
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}
.proinfo {
  padding: 5px 10px;
}
.van-nav-bar{
  position:fixed;
  top:0px;
  left:0px;
  z-index:888;
  width: 100%;
}

.box{
  overflow: hidden;
  background-color:rgba(242, 242, 242, 1);
  .info{
    overflow: hidden;
    background-color:#fff;
    border-radius:0 0 .2rem .2rem;
    padding:.1rem;
    .price{
      color:red;
      line-height: .4rem;
      font-size:.2rem
    }
  }
  .comment{
  height:5rem;
  width: 100%;
  background-color:#fff;
  margin-top:.1rem;
  border-radius:.2rem
  }
  .detail{
    height:8rem;
    width: 100%;
    background-color:#fff;
    margin-top:.1rem;
    border-radius:.2rem
  }

}

</style>
