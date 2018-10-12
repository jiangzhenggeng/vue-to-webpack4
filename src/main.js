import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import 'es6-promise/auto'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
