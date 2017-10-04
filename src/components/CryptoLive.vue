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
            h1.title.is-3(v-bind:key='amount') {{ amount | currency('$', 4) }}
          h6.subtitle.h6.gray {{title}}
          .info
            p {{ currency_owned }} owned <br />
              span {{ pct_change }} ({{ currency_owned_gain | currency }}) <br />
              span.has-text-success Total: {{ currency_owned_value | currency }} <br />
              span.has-text-success Cost: {{ owned_cost | currency }} 
            p: small last tick:  {{ latest_date | formatTime}}
  
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
const config = require('../config')
const NumberOfRetries = 20

export default {
  name: 'crypto-live',
  data () {
    return {
      loading: false,
      amount: this.get_amount,
      latest_date: '',
      message: '',
      currency_owned: 0.00,
      owned_cost: 1800.00,
      total_fee: 0.0,
      channel_id: null,
      retries: 0
    }
  },
  props: {
    title: {type: String, required: true},
    currency: {type: String, required: true}
  },
  computed: {
    ...mapGetters([
      'bitfinexTrade',
      'bitfinexTradeByChannel',
      'bitfinexWebSocketConnected',
      'bitfinexWebSocketError',
      'getBtcUsdChannel',
      'getIotUsdChannel'
    ]),
    currency_owned_gain: function () {
      return (this.currency_owned * this.amount) - this.owned_cost
    },
    currency_owned_value: function () {
      return this.currency_owned * this.amount
    },
    pct_change: function () {
      return (100 * (this.currency_owned_gain / this.owned_cost)).toFixed(1) + '%'
    },
    get_amount: function () {
      return this.$store.getters.bitfinexTradeByChannel(this.channel_id)[2][3]
    }
  },
  methods: {
    ...mapActions([
      'upsertCrypto'
    ]),
    loadData: function () {
      var socket = new WebSocket('wss://api.bitfinex.com/ws/2')
      const vm = this

      socket.onerror = function (err) {
        if (this.retries >= NumberOfRetries) {
          socket.disconnect()
          console.log('Disconnecting from Bitfinex CryptoLive websocket after 20 errors...')
        } else {
          this.retries += 1
          console.error('Error with he Bitfinex CryptoLive websocket: ', err)
        }
      }

      let msg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: vm.ticker
      })

      socket.onopen = function (event) {
        console.log('Connected to Bitfinex for CryptoLive: ' + vm.currency)
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
          vm.upsertCrypto({currency: vm.currency, amount: vm.currency_owned_value})
        }
      }

      socket.onclose = function (event) {
        console.log('Disconnected from Bitfinex CryptoLive')
        if (vm.retries <= NumberOfRetries) {
          setTimeout(function () {
            vm.loadData()
          }, 1500)
        }
      }
    },
    getChannelId: function () {
      switch (this.currency) {
        case 'BTC':
          this.channel_id = this.getBtcUsdChannel
          break
        case 'IOT':
          this.channel_id = this.getIotUsdChannel
          break
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
  watch: {
    bitfinexTrade: function (data) {
      let vm = this
      if (data.length === 3 && data[1] !== 'hb') {
        if (data[0] === vm.channel_id) {
          vm.message = data
          vm.amount = data[2][3]
          vm.latest_date = moment(Date.now())
          vm.upsertCrypto({currency: vm.currency, amount: vm.currency_owned_value})
        }
      }
    }
  },
  mounted () {
    this.getChannelId()
    this.getCryptoTotals()
  }
}
</script>

<style>
.info {
  color: gray;
}
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
  transition: text-shadow .5s ease-in-out;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /*opacity: 0;*/
  text-shadow: 0 0 3px lightgreen;
}

/* The slow way */
.bloom{
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Transition to a bigger shadow on hover */
.bloom:hover {
  box-shadow: 0 5px 16px rgba(0,0,0,0.3);
}

.load {
  z-index: 1000
}

</style>

