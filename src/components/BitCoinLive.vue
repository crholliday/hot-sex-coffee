<template lang="pug">
.container.bitcoin
  .columns.is-multiline
    .column.is-one-quarter
      .box.bloom
        article.media
          div(v-if='loading')
            i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
            .sr-only Loading...
          a.media-content(v-else @click='$router.push({name: "Crypto"})')
            .content.kpi
              transition(name='fade' mode='out-in')
                h1.title.h1(v-bind:key='amount') {{ amount | currency}}
              h6.subtitle.h6.gray Gemini Bitcoin
              p {{ btc_owned }} owned <br />
                span {{ pct_change }} ({{ btc_owned_value | currency }})            
              p: small last tick:  {{ latest_date | formatTime}}
                a.button.is-link.is-small.load(v-on:click='loadData')
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
      btc_owned: 0.00,
      owned_cost: 1800.00,
      total_fee: 0.0
    }
  },
  computed: {
    btc_owned_value: function () {
      return (this.btc_owned * this.amount) - this.owned_cost
    },
    pct_change: function () {
      return (100 * (this.btc_owned_value / this.owned_cost)).toFixed(1) + '%'
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
        setTimeout(function () {
          vm.loadData()
        }, 1500)
      }
    },
/*     getBtc: function () {
      // Block explorer api - https://blockexplorer.com/api-ref
      let url = 'https://blockexplorer.com/api/addr/' + config.btc_address

      axios.request(url)
        .then(response => {
          this.data = response.data
          this.btc_owned = response.data.balance
        })
        .catch(function (error) {
          console.log(error)
        })
    }, */
    getCryptoTotals: function () {
      axios.request(config.api_base_url + '/crypto-totals')
        .then(response => {
          const index = response.data.findIndex(item => item.currency === 'BTC')
          let data = response.data[index]
          this.owned_cost = data.totalCost
          this.btc_owned = data.totalCrypto - data.totalFee
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

