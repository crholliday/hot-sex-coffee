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
                h1.title.h1(v-bind:key='amount') ${{ amount }}
              h6.subtitle.h6.gray Bitfinex IOTA
              p {{ iot_owned }} owned <br />
                span {{ pct_change }} ({{ iot_owned_value | currency }})            
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
  name: 'iota-live',
  data () {
    return {
      loading: false,
      label: 'IOTA',
      amount: '0.00',
      latest_date: '',
      message: '',
      iot_owned: 0.00,
      owned_cost: 1800.00,
      total_fee: 0.0
    }
  },
  computed: {
    iot_owned_value: function () {
      return (this.iot_owned * this.amount) - this.owned_cost
    },
    pct_change: function () {
      return (100 * (this.iot_owned_value / this.owned_cost)).toFixed(1) + '%'
    }
  },
  methods: {
    loadData: function () {
      var socket = new WebSocket('wss://api.bitfinex.com/ws/2')
      const vm = this

      socket.onerror = function (error) {
        console.log('WebSocket Error: ' + error)
      }

      let msg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tIOTUSD'
      })

      socket.onopen = function (event) {
        console.log('Connected to Bitfinex')
        socket.send(JSON.stringify(msg))
      }

      socket.onmessage = function (event) {
        let data = JSON.parse(event.data)

        if (data.length === 3 && data[1] !== 'hb') {
          console.log(data)
          vm.message = data
          vm.amount = data[2][3]
          vm.latest_date = moment(Date.now())
        }
      }

      socket.onclose = function (event) {
        console.log('Disconnected from Bitfinex')
        setTimeout(function () {
          vm.loadData()
        }, 1500)
      }
    },
    // getIot: function () {
    //   let url = 'https://api.bitfinex.com/v1/pubticker/iotusd'

    //   axios.get(url)
    //     .then(response => {
    //       this.data = response.data
    //       console.log(response)
    //       this.amount = response.data.last_price
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    getCryptoTotals: function () {
      axios.request(config.api_base_url + '/crypto-totals')
        .then(response => {
          const index = response.data.findIndex(item => item.currency === 'IOT')
          let data = response.data[index]
          this.owned_cost = data.totalCost
          this.iot_owned = data.totalCrypto - data.totalFee
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
    // this.getIot()
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

