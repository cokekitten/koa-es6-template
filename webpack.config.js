const path = require('path')
const externals = require('externals-dependencies')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackconfig = {
  target: 'node', // 服务端打包
  mode: 'production',
  entry: {
    server: path.join(__dirname, 'bin/www.js'), // 项目入口文件，之后可以设置多入口
  },
  // devtool: 'eval-source-map', // 开发调试时可选
  output: {
    filename: '[name].bundle.js', // 输出文件的文件名
    path: path.join(__dirname, './dist'), // 输出文件所在路径，需要用绝对路径
  },
  module: {
    rules: [
      {
        // 设定转译规则，.jsx, .js .ts 使用 babel-loader 把任务交给 babel
        test: /\.(js|jsx|ts)?$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }, // 缓存
        },
        exclude: [path.join(__dirname, '/node_modules')], // 排除掉 node_modules 文件夹
      },
    ],
  },
  // 开发服务器，其实此项目没有用上，配置的含义是以 contentBase 为根目录启动一个服务器
  // 打开浏览器就可以访问该服务器，代码有更新会自动刷新页面，端口默认 8080
  // devServer: {
  //   contentBase: './dist',
  //   open: true,
  // },
  resolve: {
    extensions: ['.jsx', '.js', '.ts'], // 设置一下 webpack 要扫描的文件后缀
  },
  plugins: [
    new CleanWebpackPlugin(), // 用插件清理一下 webpack 生成的某些垃圾
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  externals: [externals(), nodeExternals()], // node 打包可去除一些警告
}
module.exports = webpackconfig
