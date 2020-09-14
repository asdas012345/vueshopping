/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 10:46:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-02 20:40:19
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import user from './user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    cart,
    user
  }
})
