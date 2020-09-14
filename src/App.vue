<template>
  <div class="container">
    <!-- <div class="box">
      <header class="header"></header>
      <div class="content">
        内容
      </div>
    </div> -->
    <transition name="slide">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <router-view name="footer"></router-view>
    <!-- <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="iconfont icon-icon-"></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer> -->
  </div>
</template>

<style lang="scss">
* { padding: 0; margin: 0; list-style: none;}
html, body, .container { width: 100%;height: 100%;}
html {
  // font-size: 100px; // 保证所有的机型 rem为单位的话 高度保持一致 0.5rem  那么所有机型 高度均为50px
  // 以设计稿 的机型为基础进行设置，其余机型自动适配 ---- 适合所有的机型展示的项目一摸一样
  // iphone5  100/320*100 = 31.25vw
  // iphone6  100 / 375 * 100vw  = 26.6666666666vw
  font-size: 26.6666666vw;
}
// 横屏状态
@media all and (orientation : landscape) {
  html {
    font-size: 100px;
  }
}
body {
  font-size: 14px;
}
.container {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .box{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto; // 内容的高度会大于 空间的高度
    .header {
      height: 0.44rem;
      background-color: #f66;
    }
    .content {
      flex: 1;
      overflow: auto;
    }
  }
  .footer {
    height: 0.5rem;
    background-color: #efefef;
    ul{
      display: flex;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.router-link-exact-active.router-link-active {
          color: #f66;
        }

        span {
          font-size: .24rem;
        }
        p {
          font-size: .12rem;
        }
      }
    }
  }
}
// .slide-enter {
//   transform: translateX(100%)
// }
// .slide-enter-active {
//   transition: all 0.5s;
// }
// .slide-enter-to {
//   transform: translateX(0)
// }
// .slide-leave {
//   transform: translateX(0)
// }
// .slide-leave-active {
//   transition: all 0s;
// }
// .slide-leave-to {
//   transform: translateY(-100%)
// }
 .slide-enter-active {
    animation: bounce-in .5s;
  }
  .slide-leave-active {
    animation: bounce-in 0s;
  }
  @keyframes bounce-in {

    0%{
      transform:translateX(-100%);
      opacity: 0;
    }

    100%{
      transform:translateX(0);
      opacity: 1;
    }
  }
</style>
