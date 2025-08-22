//引入一个包
const path = require('path')
//引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/, //test 指定规则生效的文件，以下匹配以 ts 结尾的文件
        use: 'ts-loader', //要使用的loader，用 ts-loader 处理以 ts 结尾的文件
        exclude: /node_modules/ //要排除的文件
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    open: false, // 启动项目的同时自动打开浏览器
    host: 'localhost', // 设置服务器主机地址
    port: 4000, // 设置服务器端口
    hot: true // 开启热模块替换
  }
}
