/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-18 10:14:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-31 15:42:17
 */
/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-18 10:14:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-25 21:20:19
 */
import request from './../utils/request'

/**
 * 请求首页的轮播图
 * get
 * 无需参数
 */
export function getBannerData () {
  // http://localhost:3000/api/banner
  return request.get('/banner')
}

/**
 * 请求首页的列表数据
 * get
 * limit 默认值为10
 * count 默认值为1
 */
export function getProData (params) {
  return request.get('/pro', { params })
}

// 详情数据
export function getProDetailData (params) {
  return request.get('/pro/detail', { params })
}

// 验证手机号
export function docheckphone (params) {
  return request.post('/user/docheckphone', params)
}

// 发送验证码
export function dosendmsgcode (params) {
  return request.post('/user/dosendmsgcode', params)
}

// 验证验证码
export function docheckcode (params) {
  return request.post('/user/docheckcode', params)
}

// 注册
export function dosetpassword (params) {
  return request.post('/user/dosetpassword', params)
}

// 登陆验证码
export function dosendloginCode (params) {
  return request.post('/user/dosendloginCode', params)
}

// 手机号 验证码登陆
export function dosmslogin (params) {
  return request.post('/user/dosmslogin', params)
}
// 账号户/邮箱/手机号 密码登录

export function domlogin (params) {
  return request.post('/user/domlogin', params)
}
// 加入购物车
export function addCart (params) {
  return request.post('/cart/add', params)
}
// 获取购物车数据
export function getCartData (params) {
  return request.post('/cart', params)
}
// 删除购物车数据
export function deleteCartData (params) {
  return request.post('/cart/delete', params)
}
// 更新购物车数据
export function updateCartNum (params) {
  return request.post('/cart/updateNum', params)
}
// 更新全选的选中状态
export function updateAllFlag (params) {
  return request.post('/cart/updateAllFlag', params)
}
// 更新单个商品的选中状态
export function updateFlag (params) {
  return request.post('/cart/updateFlag', params)
}
// 获取分类接口
export function getCategory (params) {
  return request.get('pro/category', { params })
}
// 获取分类下的品牌
export function getCategoryBrand (params) {
  return request.get('pro/categorybrand', { params })
}
// 获取分类下品牌的商品列表
export function getCategoryBrandList (params) {
  return request.get('pro/categorybrandlist', { params })
}
