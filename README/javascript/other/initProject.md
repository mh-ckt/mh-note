## 关于使用 webpack 初始化一个项目

第一步： 在项目下使用 npm init -y  
这一步就是初始化项目 生成 package.json 文件 package.json 就是包管理文件

第二步： 安装 webpack 依赖 npm i -D webpack webpack-cli webpack-dev-server
解释：-D 指的是开发依赖 webpack-cli 是 webpack 的命令行工具

第三步：创建 webpack.config.js 文件 用于配置 webpack

第五步：在 package.json 的配置文件里 添加 "build":"webpack" 以及 "dev": "webpack serve --open"

第七步：安装插件 npm i html-webpack-plugin

第六步：在终端使用 npm run dev 开启项目
