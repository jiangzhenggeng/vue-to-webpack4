// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const os = require('os')
const networkInterfaces = os.networkInterfaces()
let IPv4 = ''

Object.keys(networkInterfaces).forEach((key) => {
  networkInterfaces[key].forEach((item) => {
    if (item.family == 'IPv4' && item.address.indexOf('10.1') > -1) {
      IPv4 = item.address
    }
  })
})

module.exports = {
  dll: true,
  module: [
    {
      id: 'main',
      entry: {
        app: './src/main.js'
      },
      options: {
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html'
      },
      assetsFiles: ['*.html'],
      chunks: {
        'vendor-babel-polyfill': ['babel-polyfill', 'es6-promise'],
        'vue-libs': ['vue-awesome-swiper', 'v-viewer', 'vue-grid-layout']
      },
      openUrl: {
        path: '/'
      }
    },
    {
      id: 'main2',
      entry: {
        app: './src/main2.js'
      },
      assetsFiles: ['main2.html'],
      options: {
        filename: path.resolve(__dirname, '../dist/main2.html'),
        template: 'index.html'
      },
      openUrl: {
        path: '/'
      }
    }
  ],
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: 'http://10.129.27.53/index.php/apiManagementPro/Mock/simple/rx1fnLUac06d0fbac2501f53ed63329e86e86f5d51ff72a?uri=',
        target: 'http://localhost:8079',
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: IPv4 || 'localhost', // can be overwritten by process.env.HOST
    port: 8090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',// '/zxstatic/web/5d/zx/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
