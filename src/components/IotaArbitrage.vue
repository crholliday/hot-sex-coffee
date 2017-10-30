<template lang="pug">
.content.iota
  ConnectedButton(:connected='bitfinexWebSocketConnected')
  .title Arbitrage
  .control.has-icons-left
       input.input.is-medium.is-success(type='number' placeholder='amount' v-model='amount')
       .icon.is-small.is-left $
  p
  .columns
    .column.is-5
      .heading.is-size-6 USD -> BTC
      .title.is-4 {{getBtcUsdTradeValue | currency}}
      .heading.is-size-6 BTC -> MIOTA
      .title.is-4 {{getIotBtcTradeValue | currency('', 8)}}
      .heading.is-size-6 USD -> MIOTA
      .title.is-4 {{getIotUsdTradeValue | currency('$', 4)}}
    .column.is-7
      .heading.is-size-6 {{amount | currency}} -> MIOTA
      .title.is-4 {{usd_iot | currency('')}} MI
      p
      .heading.is-size-6 {{amount | currency}} -> BTC -> MIOTA
      .title.is-4 {{usd_btc_iot | currency('')}} MI
      .box.tx
        .heading.is-size-6 Scenario
        .control.has-icons-left
          input.input.is-medium(type='number' placeholder='BTC @ price' v-model='btcBoughtPrice')
          .icon.is-small.is-left $
        .heading.is-size-6 {{amount | currency}} -> BTC -> MIOTA
        .title.is-4 {{scenario_iot | currency('')}} MI
  
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
Add multi-currency swaps to my trades
Or come up with a better way to track my tokens
Redesign arbitrage component... too boring and clunky
Redesign FlightCard component
Add link to Grafana dashboard
Add more IRI metrics:
  - Neighbor details
  - TPS
  - TXs
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

