const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const utils = require('./utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let commonLoaders = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  {
    test: /\.js$/,
    loader: 'happypack/loader?id=babel-loader', // 增加新的HappyPack构建loader
    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 1,
      name: utils.assetsPath('img/[name].[hash:7].[ext]'),
    },
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 1,
      name: utils.assetsPath('media/[name].[hash:7].[ext]'),
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 9999999,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
    },
  },
]

module.exports = function (options) {
  let sourceMap = options.sourceMap

  let returnLoadersArray = []

  let typeLoaders = [
    {
      loader: 'css',
    }, {
      loader: 'less',
    }, {
      loader: 'sass',
    }, {
      ext: 'scss',
      loader: 'sass',
    }, {
      ext: 'styl',
      loader: 'stylus',
    },
  ]
  typeLoaders.forEach((item) => {
    let use = [
      options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap,
        },
      },
    ]

    let oneOfUse = [
      options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap,
          modules: true,
          localIdentName: '[hash:base64:8]',
        },
      },
    ]

    if (options.usePostCSS) {
      use.push({
        loader: 'postcss-loader',
        options: {
          sourceMap,
        },
      })
      oneOfUse.push({
        loader: 'postcss-loader',
        options: {
          sourceMap,
        },
      })
    }

    if (item.loader !== 'css') {
      let l = {
        loader: item.loader + '-loader',
        options: {
          sourceMap,
        },
      }
      use.push(l)
      oneOfUse.push(l)
    }

    returnLoadersArray.push({
      test: new RegExp('\\.' + (item.ext || item.loader) + '$'),
      oneOf: [
        {
          resourceQuery: /module/,
          use: oneOfUse,
        },
        {
          use,
        },
      ],
    })
  })

  return commonLoaders.concat(returnLoadersArray)
}
