<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-29 16:10:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-01 21:38:16
-->

<template>
  <div class="box">
    <header class="header">
      <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action>
        <template #left>
          <div class="searchback" @click="$router.push('/')">
            <van-icon name="arrow-left"></van-icon>
          </div>
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </header>
    <div class="content">
      <van-empty
        v-if="!this.searchlist.length"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="没有查找到您想要的商品信息"
      />
      <div v-else>
        <van-sticky>
          <van-dropdown-menu>
            <van-dropdown-item v-model="price" :options="option1" />
            <van-dropdown-item v-model="sales" :options="option2" />
            <van-dropdown-item title="筛选" ref="item">
              <label class="pricelabel">价格区间</label>
              <input type="text" placeholder="0" class="priceClass" v-model="min" />
              ---
              <input type="text" placeholder="最大" class="priceClass" v-model="max" />
              <div style="padding: 5px 16px;">
                <van-button type="danger" block round @click="filter">确认</van-button>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </van-sticky>
        <van-card
          v-for="item of searchlist"
          :key="item.proid"
          :price="item.price"
          :desc="item.desc"
          :title="item.proname"
          :thumb="item.proimg"
          @click="$router.push(`/detail/${item.proid}`)"
        >
          <template #tags>
            <van-tag plain style="margin-right:5px" type="danger">{{ item.brand }}</van-tag>
            <van-tag plain type="danger">已售{{ item.sales }}</van-tag>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Search,
  Dialog,
  Icon,
  Toast,
  Empty,
  DropdownMenu,
  DropdownItem,
  SwitchCell,
  Button,
  Card,
  Tag,
  Sticky
} from 'vant'
import { getSearchData } from '@/api/order'
Vue.use(Search)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Empty)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(SwitchCell)
Vue.use(Button)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Sticky)
export default {
  data () {
    return {
      searchText: '',
      searchlist: [],
      historylist: [],
      price: 0,
      sales: 0,
      min: 0,
      max: '',
      switch1: false,
      switch2: false,
      option1: [
        { text: '价格排序', value: 0 },
        { text: '价格降序', value: 1 },
        { text: '价格升序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 0 },
        { text: '销量降序', value: 1 },
        { text: '销量升序', value: 2 }
      ]
    }
  },
  mounted () {
    this.searchText = this.$route.query.searchText
    this.getSearchData()
  },
  methods: {
    getSearchData () {
      getSearchData({
        searchText: this.searchText
      }).then(res => {
        this.searchlist = res.data.data
        // 因为sort会改变原数组，所以深拷贝list
        this.list = JSON.parse(JSON.stringify(res.data.data))
      })
    },
    onSearch () {
      this.$router.replace('/searchlist?searchText=' + this.searchText)
      this.getSearchData()
    },
    filter () {
      this.searchlist = this.list
      let arr = []
      if (this.max === null) {
        arr = this.searchlist.filter(item => {
          return item.price >= this.min * 1
        })
      } else {
        arr = this.searchlist.filter(item => {
          return item.price >= this.min * 1 && item.price <= this.max * 1
        })
      }
      this.searchlist = arr
      this.$refs.item.toggle()
    }
  },
  watch: {
    price (val) {
      if (val === 0) {
        this.searchlist = this.list
      } else if (val === 1) {
        this.searchlist.sort((a, b) => {
          return b.price - a.price
        })
      } else {
        this.searchlist.sort((a, b) => {
          return a.price - b.price
        })
      }
    },
    sales (val) {
      if (val === 0) {
        this.searchlist = this.list
      } else if (val === 1) {
        this.searchlist.sort((a, b) => {
          return b.sales - a.sales
        })
      } else {
        this.searchlist.sort((a, b) => {
          return a.sales - b.sales
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.van-search {
  padding: 5px 12px;
}
.searchback {
  margin: 0 20px 0 0;
}
.content {
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .pricelabel {
    margin: 10px;
  }
  .priceClass {
    width: 80px;
    height: 30px;
    margin: 15px 0;
    border: 1px solid orange;
    padding: 0 5px;
  }
}
</style>
