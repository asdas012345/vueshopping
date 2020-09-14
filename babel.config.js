/*
 * @Descripttion:
 * @version:
 * @Author: lujj
 * @Date: 2020-08-13 20:19:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-17 16:34:50
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
