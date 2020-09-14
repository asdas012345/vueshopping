/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 10:46:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-05 23:14:58
 */
import Vue from 'vue' // 引入Vue的基础模块
import App from './App.vue' // 主页面结构
import './registerServiceWorker' // 暂时不去关心 <script src=""></script> 直接相当于把代码放到这个位置
import router from './router' // 导入路由模块
import store from './store' // 导入 状态管理器 模块
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = true // 生产环境标识   --- false （开发环境，测试环境，生产环境）

// 类似于new Vue({ el: '', components: {}})
// 使用如下写法，可以避免使用 components注册组件以及在 public/index.html 中 使用组件
// 结合 vue实例图谱加以理解
Vue.use(VueLazyload, {
  loading: require('@/common/img/default.png')
})
new Vue({
  router,
  store,
  render: h => h(App) // 通过render 直接把 App.vue 组件渲染至 id 为 app的选项内部
}).$mount('#app')
