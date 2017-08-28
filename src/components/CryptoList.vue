<template lang="pug">
.container.stocks
  p.title.is-2 Crypto List 
    span.icon.is-large.fa.fa-btc
  .columns.is-multiline
      CryptoLive(v-bind:ticker='"tBTCUSD"' v-bind:title='"Bitcoin"' v-bind:currency='"BTC"' )
      CryptoLive(v-bind:ticker='"tIOTUSD"' v-bind:title='"IOTA"' v-bind:currency='"IOT"')
</template>

<script>
import CryptoLive from '../components/CryptoLive.vue'

export default {
  name: 'crypto-list',
  components: {
    CryptoLive
  }
}
</script>

<style>
.container.stocks {
  padding-bottom: 20px;
}
</style>

