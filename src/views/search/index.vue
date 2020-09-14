<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-29 16:10:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-31 22:10:48
-->

<template>
  <div class="box">
    <header class="header">
        <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action>
            <template #left>
                <div class="searchback" @click="$router.back()">
                    <van-icon name="arrow-left"></van-icon>
                </div>
            </template>
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
    </header>
    <div class="content">
        <div class="searchBox">
            <h3>热门搜索</h3>
            <van-tag plain round :text-color="this.searchText==='手机'?'#f66':''" @click="search('手机')">手机</van-tag>
            <van-tag plain round :text-color="this.searchText==='电脑'?'#f66':''" @click="search('电脑')">手机</van-tag>
            <van-tag plain round :text-color="this.searchText==='吃屎'?'#f66':''" @click="search('吃屎')">手机</van-tag>
            <van-tag plain round :text-color="this.searchText==='哈哈'?'#f66':''" @click="search('哈哈')">手机</van-tag>
            <van-tag plain round :text-color="this.searchText==='嘻嘻'?'#f66':''" @click="search('嘻嘻')">手机</van-tag>
            <h3>搜索历史</h3>
            <van-tag plain round v-for="(item,index) of historylist" :key="index" @click="search(item)">{{ item }}</van-tag>

        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Dialog, Icon, Tag, Toast } from 'vant'
Vue.use(Search)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Toast)
export default {
  data () {
    return {
      searchText: '',
      historylist: []
    }
  },
  mounted () {
    const searchListStr = localStorage.getItem('searchlist')
    const searchList = JSON.parse(searchListStr)
    this.historylist = searchList
  },
  methods: {
    onSearch () {
      if (this.searchText.trim() === '') {
        Toast('请先输入需要搜索的关键词')
        return
      }
      // 从本地获取 搜索列表的数据
      const searchListStr = localStorage.getItem('searchlist') || '[]'
      const searchList = JSON.parse(searchListStr)

      // 获取本次输入的查询的信息在数组中存在不存在,indexof的返回值是该字符第一次出现的索引值
      const index = searchList.indexOf(this.searchText)
      if (index === -1) {
        searchList.unshift(this.searchText)
      } else {
        searchList.splice(index, 1)
        searchList.unshift(this.searchText)
      }
      this.historylist = searchList
      localStorage.setItem('searchlist', JSON.stringify(searchList))
      this.$router.replace('/searchlist?searchText=' + this.searchText)
    },
    search (item) {
      this.searchText = item
      this.onSearch()
    },
    back () {
      Dialog.confirm({
        message: '返回到桌面'
      }).then(() => {
        this.$router.back()
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-search{
    padding:5px 12px;
}
.searchback{
    margin:0 20px 0 0;
}
.content{
    h3{
        height:.3rem;
        line-height: .3rem;
        font-size:.16rem;
    }
    .van-tag{
        padding:0.02rem .1rem;
        margin:.04rem;
        line-height:.2rem;
        height:.2rem;
        font-size: .14rem;
    }
}
</style>
