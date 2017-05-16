<template lang="pug">
.container.stocks
  p.title.is-2 Stock List
  .columns.is-multiline
      kpi-tile(v-bind:dataset='"COM/COFFEE_CLMB"' )
      kpi-tile(v-bind:dataset='"FRED/DCOILWTICO"' v-bind:title='"WTI Crude Price"' )
      kpi-tile(v-bind:dataset='"BITSTAMP/USD"' )
      kpi-tile(v-bind:dataset='"FED/RXI_N_B_IN"' v-bind:title='"Rupee/USD Exchange Rate"' )
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

