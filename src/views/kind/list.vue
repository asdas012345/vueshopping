<template>
  <div class="box">
    <header class="header">
      <ul>
        <li class="left">
          <van-icon name="arrow-left" color="#333" size="24" @click="$router.push('/kind')"/>
        </li>
        <li class="center">
          <div class="search" @click="$router.push('/search')">{{ text }}</div>
        </li>
        <li class="right">
        </li>
      </ul>
    </header>
    <div class="content">
      <van-sticky>
        <van-dropdown-menu active-color="#f66">
          <van-dropdown-item v-model="pricevalue" :options="priceoption" @change="priceSort"/>
          <van-dropdown-item v-model="salesvalue" :options="salesoption" @change="salesSort"/>
          <van-dropdown-item title="筛选" ref="item" class="myitem" position="right">
            <div class="pricebox">
              <h5>价格区间:</h5>
              <van-field v-model="min" placeholder="0" />
              <div>~</div>
              <van-field v-model="max" placeholder="最大值" />
            </div>
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round @click="filter">
                确认
              </van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <Prolist :prolist="prolist" ></Prolist>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem, Field, Button, Icon, Sticky } from 'vant'
import { getCategoryBrandList } from '@/api'
import Prolist from './Prolist'
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Sticky)
export default {
  components: {
    Prolist
  },
  data () {
    return {
      prolist: [],
      list: [], // 深拷贝的 prolist
      text: '',
      min: 0,
      max: '',
      pricevalue: 0,
      salesvalue: 0,
      switch1: false,
      switch2: false,
      priceoption: [
        { text: '默认价格', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      salesoption: [
        { text: '默认销量', value: 0 },
        { text: '销量升序', value: 1 },
        { text: '销量降序', value: 2 }
      ]
    }
  },
  mounted () {
    this.getCategoryBrandList()
  },
  methods: {
    filter () {
      this.prolist = this.list
      let arr = []
      if (this.max === null) {
        arr = this.prolist.filter(item => {
          return item.price >= this.min * 1
        })
      } else {
        arr = this.prolist.filter(item => {
          return item.price >= this.min * 1 && item.price <= this.max * 1
        })
      }
      this.prolist = arr
      this.$refs.item.toggle()
    },
    priceSort (value) {
      switch (value) {
        case 0:
          this.prolist = this.list
          break
        case 1:
          this.prolist.sort((a, b) => {
            return a.price - b.price
          })
          break
        case 2:
          this.prolist.sort((a, b) => {
            return b.price - a.price
          })
          break
      }
    },
    salesSort (value) {
      switch (value) {
        case 0:
          this.prolist = this.list
          break
        case 1:
          this.prolist.sort((a, b) => {
            return a.sales - b.sales
          })
          break
        case 2:
          this.prolist.sort((a, b) => {
            return b.sales - a.sales
          })
          break
      }
    },
    getCategoryBrandList () {
      const { category, brand } = this.$route.query
      this.text = brand
      getCategoryBrandList({
        category, brand
      }).then(res => {
        this.prolist = res.data.data
        this.list = JSON.parse(JSON.stringify(this.prolist))
      })
    }

  }
}
</script>

<style lang="scss" scoped>
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
        width: 50px;
        color: #fff;
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
.pricebox {
  padding: 10px 15px;
  display: flex;
  line-height: 44px;
  h5 {
    line-height: 44px;
    font-size:14px;
  }
  .van-field {
    flex: 1;
    input {
      text-indent: 12px;
    }
  }
}
</style>
