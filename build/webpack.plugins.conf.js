const path = require('path')
const webpack = require('webpack')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const HappyPack = require('happypack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const config = require('../config')
const utils = require('./utils')
const {chunks} = require('./custom-module')

let DllReferencePluginConfig = []
if (config.dll) {
  Object.keys(chunks).forEach((key) => {
    let DllReferencePluginNew = new webpack.DllReferencePlugin({
      manifest: require('../static/dll/' + key + '-manifest.json'),
      context: path.resolve(__dirname, '../'),
    })
    DllReferencePluginConfig.push(DllReferencePluginNew)
  })
  let pl = new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      {
        path: utils.assetsPath('dll'),
        glob: '*.dll.js',
        globPath: path.resolve(__dirname, '../static/dll/'),
      },
    ],
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    append: false,
  })
  DllReferencePluginConfig.push(pl)
}

module.exports = [
  new VueLoaderPlugin(),
  // 解决moment打包的时候把所有的语言都打包进去的问题
  new webpack.ContextReplacementPlugin(
    /moment[\/\\]locale$/,
    /zh-cn/,
  ),
  ...DllReferencePluginConfig,
  new HappyPack({
    id: 'babel-loader',
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: path.resolve(__dirname, '..','.cache--happypack'),
        },
      }],
    threadPool: happyThreadPool,
  }),
]



