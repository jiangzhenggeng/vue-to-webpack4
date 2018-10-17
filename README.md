# vue-custom-layout

广联达BIM5D产品咨询部前端项目（vue）框架

# 背景
之前开发项目，由于项目比较大，引入的包比较多，打包需要2分钟左右才能完成，
后经过各种优化，现打包20秒内可完成打包

# 使用说明

项目配置文件 ./config/index.js
```js
module.exports = {
  // 是否开启 webpack.DllPlugin 预打包
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
        'vue-vuex-vue-router-axios': ['vue', 'vuex', 'vue-router', 'axios'],
        'vue-libs': ['vue-awesome-swiper', 'v-viewer', 'vue-grid-layout'],
        'jquery-libs': ['jquery', 'jquery-mousewheel', 'malihu-custom-scrollbar-plugin'],
        'echarts': ['echarts'],
        'md5-moment-qs-uuid': ['md5', 'moment', 'qs', 'uuid'],
        'element-ui': ['element-ui']
      },
      openUrl: {
        path: '/#/page?projectId=8726300114595744866&userId=5895824920160793212&productCode=bim5d-zx'
      }
    },
    // ...
  ],
  dev: {
    // ...
  },

  build: {
    // ...
  }
}

```
## dll选项

* 开启说明：开启后对应预打包每个模块的 chunks 选项

## module 数组 一个元素对应一个页面

* id 页面标识id
* entry 入口，同webpack
* options 同html-webpack-plugin插件option选项
* chunks 数组，需要chunk的代码包，对应一个数组，数组元素对应一个包
* assetsFiles webpack.DllReferencePlugin 注入html页面的chunks模块包
* openUrl npm run dev --open 打开的url配置

## 用例
```bash
# 调试 module.main 页面并且打开浏览器
npm run dev --module='main' --open

# 默认打开第一个页面调试
npm run dev 

# 打包所有项目
npm run build 

# 打包 module.main 项目
npm run build  --module='main'

# 打包 module.main和module.main2 项目
npm run build  --module='main main2'

```
     
