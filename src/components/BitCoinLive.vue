<template lang="pug">
.column.is-one-quarter
  .box
    article.media
      div(v-if='loading')
        i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
        .sr-only Loading...
      .media-content(v-else)
        .content.kpi
          transition(name='fade' mode='out-in')
            h1.title.h1(v-bind:key='amount') {{ amount | currency}}
          h6.subtitle.h6.gray Gemini Bitcoin
          p {{ btc_owned }} owned | {{ btc_owned_value | currency }}
          p: small last tick:  {{ latest_date | formatTime}}
            a.button.is-link.is-small(v-on:click='loadData')
              span.icon.is-small
                i.fa.fa-refresh(aria-hidden='true')
  
</template>


<script>
import moment from 'moment'
import axios from 'axios'
const config = require('../config')

export default {
  name: 'bitcoin-live',
  data () {
    return {
      loading: false,
      label: 'Bitcoin',
      amount: '0.00',
      latest_date: '',
      message: '',
      btc_owned: 0.00
    }
  },
  computed: {
    btc_owned_value: function () {
      return this.btc_owned * this.amount
    }
  },
  methods: {
    loadData: function () {
      var socket = new WebSocket('wss://api.gemini.com/v1/marketdata/btcusd')
      const vm = this

      socket.onerror = function (error) {
        console.log('WebSocket Error: ' + error)
      }

      socket.onopen = function (event) {
        console.log('Connected to Gemini API.')
      }

      socket.onmessage = function (event) {
        let data = JSON.parse(event.data)
        if (data.events[0].type === 'trade') {
          vm.message = data
          vm.amount = data.events[0].price
          vm.latest_date = moment(Date.now())
        }
      }

      socket.onclose = function (event) {
        console.log('Disconnected from Gemini API.')
      }
    },
    getBtc: function () {
      this.loading = true

      // Block explorer api - https://blockexplorer.com/api-ref
      let url = 'https://blockexplorer.com/api/addr/' + config.btc_address

      axios.request(url)
        .then(response => {
          this.data = response.data
          this.btc_owned = response.data.balance
          this.loading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadData()
    this.getBtc()
  }
}
</script>

<style>
.content.kpi {
  align-content: center;
  text-align: center;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all .5s ease;
  background-color:lightgreen;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /*opacity: 0;*/
  background-color: transparent;
}

</style>

