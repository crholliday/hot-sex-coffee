<template lang="pug">
.container.stocks
  p.title.is-2 Stock List
  .columns.is-multiline
      kpi-tile(v-bind:trendTicker='"COM/COFFEE_CLMB"' v-bind:ticker='"KC=F"' v-bind:title='"Coffee Futures"' )
      kpi-tile(v-bind:trendTicker='"FRED/DCOILWTICO"' v-bind:ticker='"CL=F"' v-bind:title='"WTI Crude Price"' )
      kpi-tile(v-bind:trendTicker='"BITSTAMP/USD"' v-bind:ticker='"BTCUSD=X"')
      kpi-tile(v-bind:trendTicker='"FED/RXI_N_B_IN"' v-bind:ticker='"USDINR=X"' v-bind:title='"Rupee/USD Exchange Rate"' )
</template>

<script>
import KpiTile from '../components/KpiTile.vue'

export default {
  name: 'stock-list',
  components: {
    KpiTile
  }
}
</script>

<style>
.container.stocks {
  padding-bottom: 20px;
}
</style>

