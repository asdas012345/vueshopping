<!--
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-18 15:18:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-18 17:55:49
-->
<template>
    <van-grid :column-num="5" :border="false" :icon-size="44">
        <van-grid-item v-for="item of list" :key="item.test" :icon="item.icon" :text="item.test" />
    </van-grid>

</template>
<script>
import Vue from 'vue'
import { Grid, GridItem } from 'vant'
Vue.use(Grid)
Vue.use(GridItem)
export default {
  data () {
    return {
      list: [
        {
          test: 'JJ超市',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp'
        },
        {
          test: '数码电器',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp'
        },
        {
          test: 'JJ服饰',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp'
        },
        {
          test: 'JJ生鲜',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp'
        },
        {
          test: 'JJ到家',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116602/7/11200/3796/5efbf375Ebba41029/f07cc166f368fa05.png'
        },
        {
          test: 'JJ充值',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/146390/3/1846/4909/5efbf39aEe5f5f797/300071558a9ab078.png'
        },
        {
          test: '9.9元拼',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/143365/25/1824/3716/5efbf3c0E5175e1fb/88f6227257a29f1d.png'
        },
        {
          test: '领券',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/113589/24/11332/4897/5efbf3feE705d87db/e5c12d5e943266b9.png'
        },
        {
          test: '领金贴',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/131663/33/3380/3674/5efbf50fEf79cf314/af4b57d2383e605d.png'
        },
        {
          test: 'plus会员',
          icon: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123730/37/5924/4189/5efbf567E0a226121/d04df7c74c87cf68.png'
        }
      ]
    }
  }

}
</script>
<style lang="scss" >

    .van-grid-item__content{
      background-color:#f6f6f6;
    }

</style>
