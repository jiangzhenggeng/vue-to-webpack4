process.env.NODE_ENV = 'production'
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const {chunks} = require('./custom-module')
const babelrc = JSON.parse(fs.readFileSync(resolve('.babelrc'), 'utf8'))

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: {},
  output: {
    path: resolve('static/dll'),
    filename: '[name].[hash].dll.js',
    library: '_dll_[hash]',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel-loader',
      },
    ],
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[hash]',
      path: resolve('static/dll/[name]-manifest.json'),
      context: path.resolve(__dirname, '../'),
    }),
    new HappyPack({
      id: 'babel-loader',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: path.resolve(__dirname,'..', '.cache--happypack'),
            ...babelrc,
          },
        }],
      threadPool: happyThreadPool,
    }),
  ],
}

rm(path.resolve(__dirname, '../static/dll'), _err => {
  if (_err) throw _err

  const spinner = ora('building for production dll...')
  spinner.start()

  let promise = []
  Object.keys(chunks).forEach((key) => {
    promise.push(new Promise((resolve, reject) => {
      webpack(merge(webpackConfig, {
        entry: {
          [key]: chunks[key],
        },
      }), (err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve(1)
        }
      })
    }))
  })

  Promise.all(promise).then(() => {
    spinner.stop()
    console.log(chalk.cyan('\n  Build complete.\n'))
  })

})

