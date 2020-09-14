/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 10:46:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-03 22:25:07
 */
import Vue from 'vue' // 引入vue的基础库
import VueRouter from 'vue-router' // 引入vue-router
// import Home from '../views/Home.vue' // 引入的组件
import Footer from './../components/Footer'
import store from './../store'
Vue.use(VueRouter) // Vue 使用VueRouter

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 访问的路径
    name: 'home', // 该路由的名称
    // component: () => import('../views/home/index.vue') // 需要渲染的组件---路由的懒加载，到该路由时再加载该页面
    components: {
      default: () => import('../views/home/index.vue'),
      footer: Footer
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/kind',
    name: 'kind',
    // component: () => import('../views/kind/index.vue')
    components: {
      default: () => import('../views/kind/index.vue'),
      footer: Footer
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    // component: () => import('../views/cart/index.vue')
    components: {
      default: () => import('../views/cart/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/user',
    name: 'user',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/detail/:proid',
    name: 'detail',
    components: {
      default: () => import('../views/detail/index.vue')
    },
    // 路由传参
    props: {
      default: true,
      footer: false
    }
  },
  {
    path: '/register',
    name: 'register',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/register/index.vue')
    }
  },
  {
    path: '/sms',
    name: 'sms',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/register/sms.vue')
    }
  },
  {
    path: '/setpwd',
    name: 'setpwd',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/register/setpwd.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/login/index.vue')
    }
  },
  {
    path: '/order/:time',
    name: 'order',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/order/index.vue')
    }
  },
  {
    path: '/orderaddresslist/:time',
    name: 'order',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/order/list.vue')
    }
  },
  {
    path: '/orderaddressadd/:time',
    name: 'order',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/order/add.vue')
    }
  },
  {
    path: '/pay',
    name: 'pay',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/pay/index.vue')
    }
  },
  {
    path: '/search',
    name: 'search',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/search/index.vue')
    }
  },
  {
    path: '/searchlist',
    name: 'searchlist',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/search/list.vue')
    }
  },
  {
    path: '/kindlist',
    name: 'kindlist',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/kind/list.vue')
    }
  },
  {
    path: '/user',
    name: 'user',
    // component: () => import('../views/user/index.vue')
    components: {
      default: () => import('../views/user/index.vue')
    }
  }

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// 生成了路由的实例
const router = new VueRouter({
  mode: 'hash', // 展示的样式  /   mode还可以时 hash   /#/
  base: process.env.BASE_URL,
  routes // 路由的规则
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'cart') {
    if (store.state.user.loginState) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
