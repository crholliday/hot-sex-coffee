<template lang="pug">
.column.is-one-quarter
  .box.bloom
    article.media
      div(v-if='loading')
        i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
        .sr-only Loading...
      a.media-content(v-else @click='$router.push({name: "Crypto"})')
        .content.kpi
          transition(name='fade' mode='out-in')
            h1.title.h1(v-bind:key='amount') ${{ amount }}
          h6.subtitle.h6.gray {{title}}
          p {{ currency_owned }} owned <br />
            span {{ pct_change }} ({{ currency_owned_gain | currency }}) <br />
            span.has-text-success Total: {{ currency_owned_value | currency }}
          p: small last tick:  {{ latest_date | formatTime}}
  
</template>


<script>
import moment from 'moment'
import axios from 'axios'
import {mapActions} from 'vuex'
const config = require('../config')

export default {
  name: 'crypto-live',
  data () {
    return {
      loading: false,
      amount: '0.00',
      latest_date: '',
      message: '',
      currency_owned: 0.00,
      owned_cost: 1800.00,
      total_fee: 0.0,
      channel_id: null
    }
  },
  props: {
    ticker: {type: String, required: true},
    title: {type: String, required: true},
    currency: {type: String, required: true}
  },
  computed: {
    currency_owned_gain: function () {
      return (this.currency_owned * this.amount) - this.owned_cost
    },
    currency_owned_value: function () {
      return this.currency_owned * this.amount
    },
    pct_change: function () {
      return (100 * (this.currency_owned_value / this.owned_cost)).toFixed(1) + '%'
    }
  },
  methods: {
    ...mapActions([
      'upsertCrypto'
    ]),
    loadData: function () {
      var socket = new WebSocket('wss://api.bitfinex.com/ws/2')
      const vm = this

      socket.onerror = function (error) {
        console.log('WebSocket Error: ' + JSON.stringify(error))
      }

      let msg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: vm.ticker
      })

      socket.onopen = function (event) {
        console.log('Connected to Bitfinex for ' + vm.currency)
        socket.send(JSON.stringify(msg))
      }

      socket.onmessage = function (event) {
        let data = JSON.parse(event.data)
        if (data.event === 'subscribed') {
          vm.channel_id = data.chanId
        }

        if (data.length === 3 && data[1] !== 'hb') {
          vm.message = data
          vm.amount = data[2][3]
          vm.latest_date = moment(Date.now())
          vm.upsertCrypto({channelID: vm.channel_id, amount: vm.currency_owned_value})
        }
      }

      socket.onclose = function (event) {
        console.log('Disconnected from Bitfinex')
        setTimeout(function () {
          vm.loadData()
        }, 1500)
      }
    },
    getCryptoTotals: function () {
      axios.request(config.api_base_url + '/crypto-totals')
        .then(response => {
          const index = response.data.findIndex(item => item.currency === this.currency)
          let data = response.data[index]
          this.owned_cost = data.totalCost
          this.currency_owned = data.totalCrypto - data.totalFee
          this.total_fee = data.totalFee
          this.total_cost = data.owned_cost
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadData()
    this.getCryptoTotals()
  }
}
</script>

<style>
.container.bitcoin {
  padding-bottom: 20px;
}
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

/* The slow way */
.bloom{
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.2s ease-in-out;
}

/* Transition to a bigger shadow on hover */
.bloom:hover {
  box-shadow: 0 5px 16px rgba(0,0,0,0.3);
}

.load {
  z-index: 1000
}

</style>

