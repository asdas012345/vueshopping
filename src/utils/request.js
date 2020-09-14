/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-18 10:04:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-04 19:40:43
 */

import axios from 'axios'
import Router from './../router'

const isDev = process.env.NODE_ENV === 'development' // npm run serve 时值为真, npm run build 时值为假

const request = axios.create({
  baseURL: isDev ? '/api' : 'http://175.24.113.36:3000/api',
  timeout: 6000
})
// 添加axios的拦截器
// 添加请求拦截器 所有请求先走请求拦截器
// 响应的拦截器 所有接口返回先走响应拦截器

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 --- 统一给所有的请求都加loading的效果， 头信息传递token
  // config.common.headers['token'] = localStorage.getItem('token') // 所有的请求 都会将本地的token值传递到服务器
  config.headers.common.token = localStorage.getItem('token') // 所有的请求 都会将本地的token值传递到服务器
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么  ----  取消loading的效果，响应token的有效性
  // 获取响应的字段
  if (response.data.code === '10119') {
    // 直接跳转到登陆页面
    Router.push('/login')
    return
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
