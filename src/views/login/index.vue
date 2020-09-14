<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
    </header>
    <div class="content">
      <div v-if = "logintype === 'tel'">
        <van-field v-model="tel" placeholder="请输入手机号" clearable/>
        <van-field :value="telCode"  readonly placeholder="请输入手机验证码" clearable @click.native.stop="show = true" >
          <template #button>
            <van-button size="small" :disabled="flag" round color="rgb(255, 77, 23)" @click.stop="sendCode">{{ btncontent }}</van-button>
          </template>
        </van-field>
        <van-number-keyboard
          v-model="telCode"
          :show="show"
          :maxlength="5"
          @blur="show = false"
        />
        <van-button class="mybtn" block round @click="login" :disabled="btnflag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
          登陆
        </van-button>
      </div>
      <div v-if = "logintype === 'loginname'">
        <van-field v-model="loginname" placeholder="手机号/邮箱/用户名" clearable/>
        <van-field
        v-model="password"
        :type="type"
        placeholder="请输入8-20位登陆密码"
        clearable
        :right-icon="righticon"
        @click-right-icon="changeIcon"
        key="pwd1">
        </van-field>
        <van-button class="mybtn" block round @click="loginOfLoginname" :disabled="btn1flag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
          登陆
        </van-button>
      </div>
      <van-row >
        <van-col span="12">
          <span v-if="logintype === 'tel'" @click="toggleLogin('loginname')">账户密码登陆</span>
          <span v-if="logintype === 'loginname'" @click="toggleLogin('tel')">手机验证码登陆</span>
        </van-col>
        <van-col span="12" class="right" @click="$router.push('/register')">
          使用手机快速注册
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Field, Button, Image as VanImage, Dialog, NumberKeyboard, Toast, Col, Row } from 'vant'
import { dosendloginCode, dosmslogin, domlogin } from '@/api'
import { mapMutations } from 'vuex'
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(NumberKeyboard)
Vue.use(VanImage)
Vue.use(Toast)
Vue.use(Col)
Vue.use(Row)
export default {
  data () {
    return {
      tel: '',
      telCode: '',
      show: false,
      btncontent: '发送验证码',
      timer: null,
      flag: false,
      reg: /^[1][3,4,5,7,8][0-9]{9}$/,
      loginname: '',
      password: '',
      logintype: 'loginname',
      righticon: 'closed-eye', // eye-o
      type: 'password'
    }
  },
  watch: {
    telCode (newVal) {
      if (newVal.length === 5) {
        this.show = false
      }
    }
  },
  methods: {
    changeIcon () {
      console.log('111')
      if (this.type === 'password') {
        this.righticon = 'eye-o'
        this.type = 'text'
      } else {
        this.righticon = 'closed-eye'
        this.type = 'password'
      }
    },
    loginOfLoginname () {
      domlogin({
        loginname: this.loginname,
        password: this.password
      }).then(res => {
        if (res.data.code === '10007') {
          Toast('密码错误')
        } else if (res.data.code === '10005') {
          Toast('该用户还未注册')
        } else {
          Toast('登陆成功')
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('loginState', true)
          this.changeloginstate(true)
          this.$router.push('/')
        }
      })
    },
    toggleLogin (type) {
      this.logintype = type
    },
    sendCode () {
      let time = 10
      this.timer = setInterval(() => {
        time--
        if (time <= 0) {
          this.btncontent = '发送验证码'
          this.flag = false
          clearInterval(this.timer)
        } else {
          this.flag = true
          this.btncontent = '重新发送(' + time + 's)'
        }
      }, 1000)
      dosendloginCode({
        tel: this.tel
      }).then(res => {
        console.log(res.data)
      })
    },
    login () {
      console.log('login')
      dosmslogin({
        tel: this.tel,
        telCode: this.telCode
      }).then(res => {
        if (res.data.code === '10006') {
          Toast('验证码错误')
        } else if (res.data.code === '10005') {
          Toast('该用户还未注册，请先注册')
        } else {
          Toast('登陆成功')
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('loginState', true)
          this.changeloginstate(true)
          this.$router.back()
        }
      })
    },
    ...mapMutations({
      changeloginstate: 'user/change_login_state'
    })
  },
  computed: {
    btnflag () {
      if (this.telCode.length !== 5 || !this.reg.test(this.tel)) {
        return true
      } else {
        return false
      }
    },
    btn1flag () {
      if (this.loginname === '' || this.password.length < 8) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 30px 15px;
  .van-field {
    border-bottom: 1px solid #efefef;
  }
  .mybtn {
    margin-top: 60px;
    margin-bottom: 15px;
    box-shadow: 0 0 20px #f66;
  }
  .van-dialog {
    background-color: #0f0;
    .van-dialog__footer {
      .van-dialog__confirm {
        background-color: #f66;
        .van-button__content {
          color:#fff;
        }
      }
    }
  }
  .tip {
    text-align: center;
    .van-image {
      width: 100px;
      display: block;
      margin: 10px auto 30px;
    }
    .note {
      padding: 10px 24px 30px;
    }
  }
  .right {
    text-align: right;
  }
}
</style>
