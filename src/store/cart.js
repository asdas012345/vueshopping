
/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-09-01 19:26:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-03 21:41:09
 */
import { getCartData } from '@/api'
export default {
  namespaced: true, // 命名空间 ---避免actions和mutations重名
  state: {
    cartlist: []
  },
  actions: {
    getCartData (context, userid) {
      return new Promise((resolve, reject) => {
        getCartData({
          userid
        }).then(res => {
          context.commit('change_cart_list', res.data.data)
          resolve()
        })
      })
    }
  },
  mutations: {
    change_cart_list (state, data) {
      state.cartlist = data
    }
  }
}
