<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="back"
      />
    </header>
    <div class="content">
      <div class="tip">
        <van-image src="data:image/png;base64,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" />
        <div class="note">
          我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
        </div>
      </div>
      <van-field :value="telCode" readonly placeholder="请输入手机验证码" clearable @click.native.stop="show = true" >
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
      <van-button class="mybtn" block round @click="checkCode" :disabled="telCodeFlag" color="linear-gradient(to right, rgb(241, 0, 0), rgb(255, 77, 23))">
        下一步
      </van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Field, Button, Image as VanImage, Dialog, NumberKeyboard, Toast } from 'vant'
import { dosendmsgcode, docheckcode } from '@/api'
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(NumberKeyboard)
Vue.use(VanImage)
Vue.use(Toast)
export default {
  data () {
    return {
      telCode: '',
      show: false,
      btncontent: '发送验证码',
      timer: null,
      flag: false
    }
  },
  mounted () {
    // 发送短信验证码 外加 倒计时
    this.sendCode()
  },
  watch: {
    telCode (newVal) {
      if (newVal.length === 5) {
        this.show = false
      }
    }
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '点击“返回”将中断注册，确定返回吗？',
        messageAlign: 'left',
        theme: 'round'
      })
        .then(() => {
          // on confirm
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        })
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
      dosendmsgcode({
        tel: localStorage.getItem('mobile')
      }).then(res => {
        console.log(res.data)
      })
    },
    checkCode () {
      docheckcode({
        tel: localStorage.getItem('mobile'),
        telCode: this.telCode
      }).then(res => {
        console.log('验证', res.data)
        if (res.data.code === '10004') {
          Toast('验证码输入错误')
        } else {
          // 输入密码页面
          this.$router.push('/setpwd')
        }
      })
    }
  },
  computed: {
    telCodeFlag () {
      if (this.telCode.length !== 5) {
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
}
</style>
