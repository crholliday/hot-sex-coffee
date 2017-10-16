<template lang="pug">
.content.iota
  ConnectedButton(:connected='bitfinexWebSocketConnected')
  .title Arbitrage
  .box.tx
     .control.has-icons-left
       input.input.is-medium.is-success(type='number' placeholder='amount' v-model='amount')
       .icon.is-small.is-left $
  .columns
    .column.is-5
      .heading.is-size-6 USD -> BTC
      .title {{getBtcUsdTradeValue | currency}}
      .heading.is-size-6 BTC -> MIOTA
      .title {{getIotBtcTradeValue | currency('', 8)}}
      .heading.is-size-6 USD -> MIOTA
      .title {{getIotUsdTradeValue | currency('$', 4)}}
    .column.is-7
      .subtitle.is-size-4 {{amount | currency}} -> MIOTA
      .title {{usd_iot | currency('')}} MI
      p
      .subtitle.is-size-4 {{amount | currency}} -> BTC -> MIOTA
      .title {{usd_btc_iot | currency('')}} MI
      .box.tx
        .heading.is-size-6 Scenario
        .control.has-icons-left
          input.input.is-medium(type='number' placeholder='BTC @ price' v-model='btcBoughtPrice')
          .icon.is-small.is-left $
        .subtitle.is-size-4 {{amount | currency}} -> BTC -> MIOTA
        .title {{scenario_iot | currency('')}} MI
  
</template>


<script>
import moment from 'moment'
import ConnectedButton from './ConnectedButton'
import {mapGetters} from 'vuex'

// const config = require('../config')

/* Todo
Add neighbors list
Move more stuff to config
Modal for disconnected services, tx details, etc
Figure out how to pause tx list
Add multi-currency swaps to my trades

*/

export default {
  name: 'iota-arbitrage',
  data () {
    return {
      loading: false,
      amount: 1000,
      msg: {},
      btcBoughtPrice: 0
    }
  },
  components: {
    ConnectedButton
  },
  computed: {
    ...mapGetters([
      'bitfinexTrade',
      'getBtcUsdTradeValue',
      'getIotUsdTradeValue',
      'getIotBtcTradeValue',
      'bitfinexWebSocketConnected',
      'bitfinexWebSocketError'
    ]),
    usd_btc_iot: function () {
      return this.amount / this.getBtcUsdTradeValue / this.getIotBtcTradeValue
    },
    usd_iot: function () {
      return this.amount / this.getIotUsdTradeValue
    },
    scenario_iot: function () {
      return this.amount / this.btcBoughtPrice / this.getIotBtcTradeValue
    }
  },
  methods: {
    getDate: function (dateString) {
      return moment.unix(dateString)
    }
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

