const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development', //将mode设置成开发环境
  devtool: 'inline-source-map', //可以对打包后的文件进行调试代码
  devServer: {
    // 使用热加载时需要设置为 true
    hot: true,
    /**
     * 下面为可选配置
     */
    // 指定使用一个 host。默认是 localhost
    host: 'localhost',
    // 端口号
    port: 3000
  },
  plugins: [
    //配置打包后的html文件
    new HtmlWebpackPlugin({
      template: './index.html', //指定打包前使用的html模版
      // filename: 'app',  //打包后的html文件名
      inject: 'body' //这里指的是将打包后的script标签添加的位置
    }),
    // 用法：new CleanWebpackPlugin(paths [, {options}])
    new CleanWebpackPlugin(['dist']),
    // 添加 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖，由于设置了 mode: 'development'，所以这个插件可以省略
    // new webpack.NamedModulesPlugin(),
    // 进行模块热替换
    new webpack.HotModuleReplacementPlugin()
  ]
}
