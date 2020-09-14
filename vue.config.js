/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-17 16:33:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-30 22:11:06
 */

module.exports = {
  // 代理服务器的配置
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:3000',
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false// 关了eslint检查,可以做到实时更新
}
