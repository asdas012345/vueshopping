<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 16:36:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-13 21:43:56
-->
<template>
  <div class="box">
    <header class="header">
      <ul>
        <li class="left">
          <van-icon name="arrow-left" color="#333" size="24"/>
        </li>
        <li class="center">
          <div class="search" @click="$router.push('/search')">搜索商品</div>
        </li>
        <li class="right">
        </li>
      </ul>
    </header>
    <div class="content">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item :title="item" v-for="item of categorylist" :key="item.proid" @click="selectItem(item)"/>
      </van-sidebar>
      <div class="contentright">
        <van-grid :column-num="3" icon-size="42">
          <van-grid-item :icon="item.logo" :text="item.brand" v-for="(item,index) of brandlist" :key="index" @click="tolist(item.brand)"/>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem, Grid, GridItem, Icon } from 'vant'
import { getCategory, getCategoryBrand } from '@/api'
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
export default {
  data () {
    return {
      activeKey: 0,
      categorylist: [],
      brandlist: []
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    onChange (val) {
      this.activeKey = val
    },
    getCategory () {
      getCategory().then(res => {
        this.categorylist = res.data.data
        this.selectItem(this.categorylist[0])
      })
    },
    selectItem (item) {
      getCategoryBrand({
        category: item
      }).then(res => {
        this.brandlist = res.data.data
        console.log(this.brandlist)
      })
    },
    tolist (brand) {
      this.$router.push(`/kindlist?category=${this.categorylist[this.activeKey]}&brand=${brand}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .contentright {
    flex: 1;
  }
}
.header {
  background-color: #fff;
  ul {
    height: 100%;
    display: flex;
    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:nth-child(1), &:nth-child(3) {
        color: #666;
        width:50px;
      }
      &:nth-child(2) {
        flex: 1;
        .search {
          width: 100%;
          height: 0.3rem;
          background-color: #efefef;
          color: #666;
          padding-left: 12px;
          line-height: 0.3rem;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
