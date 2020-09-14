<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-19 17:28:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-19 20:55:42
-->
<template>
  <ul class="prolist">
    <li v-for="item of prolist" :key="item.proid" @click="toDetail(item.proid)">
      <img :src="item.proimg" />
      <div class="pro">
        <div class="proname">{{ item.proname }}</div>
        <div class="price">￥{{ item.price }}</div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    prolist: Array
  },
  methods: {
    toDetail (proid) {
      this.$router.push(`/detail/${proid}`)
      // this.$router.push({
      //     name:'detail',
      //     params:{proid}
      // })
    }
  }
}
</script>
<style lang="scss">
.prolist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  background-color: #f6f6f6;
  overflow: hidden;
  li {
    width: 47%;
    background-color: #ffffff;
    img {
      width: 100%;
      height: 2.1rem;
    }
    .pro {
      height: 1rem;
      .proname {
        height: 0.4rem;
        line-height: 0.2rem;
        font-size: 0.12rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        color: red;
        padding-top: 0.05rem;
      }
    }
  }
  li:nth-child(n) {
    margin-left: 2%;
  }
  li:nth-child(2n) {
    margin-right: 2%;
  }
}
</style>
