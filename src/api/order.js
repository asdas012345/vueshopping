/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-26 20:04:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-29 14:39:44
 */
import request from './../utils/request'

// 新增订单
export function orderAdd (params) {
  return request.post('/order/add', params)
}

// 获取确认订单的数据列表
export function confirmOrderInfo (params) {
  return request.post('/order/confirmOrderInfo', params)
}

// 新增地址
export function addressAdd (params) {
  return request.post('/address/add', params)
}

//  更新订单地址
export function updateOrderAddress (params) {
  return request.post('/order/updateAddress', params)
}

// 获取默认地址
export function getDefaultAddress (params) {
  return request.post('/address/defaultAddress', params)
}

// 获取地址列表
export function getAddressList (params) {
  return request.post('/address/addressList', params)
}

// 删除地址
export function DeleteAddress (params) {
  return request.post('/address/deleteAddress', params)
}

// 支付删除购物车
export function deleteCartData (params) {
  return request.post('/order/deleteCartData', params)
}

// 支付
export function pay (params) {
  return request.get('/pay/payment', { params })
}

// 搜索
export function getSearchData (params) {
  return request.get('/search', { params })
}
