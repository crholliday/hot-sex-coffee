// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import moment from 'moment'
import VeeValidate from 'vee-validate'
import store from './Store'
import Vue2Filters from 'vue2-filters'
import VueSocketio from 'vue-socket.io'

const digitsRE = /(\d{3})(?=\d)/g

require('./assets/css/bulma.css')

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

Vue.filter('duration', function (start, finish) {
  if (start && finish) {
    return moment.duration(finish - start).asDays()
  }
})

Vue.filter('formatDateHuman', function (value) {
  if (value) {
    return moment(String(value)).fromNow()
  }
})

Vue.filter('formatTime', function (value) {
  if (value) {
    // the format string is using the moment-duration-plugin
    return moment.utc(String(value)).format('LT')
  }
})

Vue.filter('currency', function (value, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  let currency = '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
})

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(Vue2Filters)
Vue.use(VueSocketio, 'http://45.33.28.15:3000')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
