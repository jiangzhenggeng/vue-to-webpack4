const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const config = require('../config')

module.exports = [
  new VueLoaderPlugin(),
  // 解决moment打包的时候把所有的语言都打包进去的问题
  new webpack.ContextReplacementPlugin(
    /moment[\/\\]locale$/,
    /zh-cn/
  ),
  new HappyPack({
    id: 'babel-loader',
    loaders: [{
      loader: 'babel-loader',
      options: {
        babelrc: true,
        cacheDirectory: true
      }
    }],
    threadPool: happyThreadPool
  }),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
]
