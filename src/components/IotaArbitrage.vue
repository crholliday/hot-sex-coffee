<template lang="pug">
.content.iota
  ConnectedButton(:connected='socketConnected')
  .title Arbitrage
  .box.tx
     .control.has-icons-left
       input.input.is-medium.is-success(type='number' placeholder='amount' v-model='amount')
       .icon.is-small.is-left $
  .columns
    .column.is-one-half
      .heading.is-size-6 USD -> BTC
      .title {{usd_per_btc | currency}}
      .heading.is-size-6 BTC -> MIOTA
      .title {{btc_per_miota | currency('$', 8)}}
      .heading.is-size-6 USD -> MIOTA
      .title {{usd_per_miota | currency('$', 4)}}
    .column.is-one-half
      .subtitle.is-size-4 {{amount | currency}} -> MIOTA
      .title {{usd_iot | currency}}
      p
      .subtitle.is-size-4 {{amount | currency}} -> BTC -> MIOTA
      .title {{usd_btc_iot | currency}}
    
      
      
  
</template>


<script>
import moment from 'moment'
import ConnectedButton from './ConnectedButton'
const NumberOfRetries = 20
// const config = require('../config')

/* Todo
Move sockets to Vuex
Add neighbors list
Move more stuff to config
Links on Txs
Modal for disconnected services, tx details, etc
Figure out how to pause tx list
*/

export default {
  name: 'iota-arbitrage',
  data () {
    return {
      loading: false,
      amount: 1000,
      btc_usd_channel: '',
      usd_per_btc: 0,
      iot_btc_channel: '',
      btc_per_miota: 0,
      iot_usd_channel: '',
      usd_per_miota: 0,
      msg: {},
      retries: 0,
      socketConnected: false
    }
  },
  components: {
    ConnectedButton
  },
  computed: {
    usd_btc_iot: function () {
      return this.amount / this.usd_per_btc / this.btc_per_miota
    },
    usd_iot: function () {
      return this.amount / this.usd_per_miota
    }
  },
  methods: {
    getDate: function (dateString) {
      return moment.unix(dateString)
    },
    loadData: function () {
      var socket = new WebSocket('wss://api.bitfinex.com/ws/2')
      const vm = this

      socket.onerror = function (err) {
        if (this.retries >= NumberOfRetries) {
          socket.disconnect()
          console.log('Disconnecting from Bitfinex Arbitrage websocket after 20 errors...')
        } else {
          this.retries += 1
          console.error('Error with the Bitfinex Arbitrage websocket: ', err)
        }
      }

      let btcUsdMsg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD'
      })

      let iotBtcMsg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tIOTBTC'
      })

      let iotUsdMsg = ({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tIOTUSD'
      })

      socket.onopen = function (event) {
        console.log('Connected to Bitfinex for Arbitrage websocket')
        vm.socketConnected = true
        socket.send(JSON.stringify(btcUsdMsg))
        socket.send(JSON.stringify(iotBtcMsg))
        socket.send(JSON.stringify(iotUsdMsg))
      }

      socket.onmessage = function (event) {
        let data = JSON.parse(event.data)
        vm.msg = data
        if (data.event === 'subscribed') {
          if (data.pair === 'BTCUSD') {
            vm.btc_usd_channel = data.chanId
          } else if (data.pair === 'IOTBTC') {
            vm.iot_btc_channel = data.chanId
          } else if (data.pair === 'IOTUSD') {
            vm.iot_usd_channel = data.chanId
          }
        }

        if (data.length === 3 && data[1] !== 'hb') {
          vm.message = data
          if (data[0] === vm.btc_usd_channel) {
            vm.usd_per_btc = data[2][3]
          } else if (data[0] === vm.iot_btc_channel) {
            vm.btc_per_miota = data[2][3]
          } else if (data[0] === vm.iot_usd_channel) {
            vm.usd_per_miota = data[2][3]
          }
        }
      }

      socket.onclose = function (event) {
        console.log('Disconnected from Bitfinex for Arbitrage websocket')
        vm.socketConnected = false
        if (vm.retries <= NumberOfRetries) {
          console.log('Attempting to reconnect Bitfinex for Arbitrage websocket')
          setTimeout(function () {
            vm.loadData()
          }, 1500)
        }
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>
.container.iota {
  padding-bottom: 20px;
}

.content.kpi {
  align-content: center;
  text-align: center;
}

.box.tx {
  padding: .5rem;
}

.load {
  z-index: 1000
}
</style>

