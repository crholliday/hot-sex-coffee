<template lang="pug">
.container.stocks
  p.title.is-2 Crypto List <span class='total'>Total Value: ( {{cryptoTotal | currency}} )</span>
  .columns.is-multiline
      CryptoLive(v-bind:ticker='"tBTCUSD"' v-bind:title='"Bitcoin"' v-bind:currency='"BTC"' )
      CryptoLive(v-bind:ticker='"tIOTUSD"' v-bind:title='"IOTA"' v-bind:currency='"IOT"')      
</template>

<script>
import CryptoLive from '../components/CryptoLive.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'crypto-list',
  components: {
    CryptoLive
  },
  computed: {
    ...mapGetters([
      'cryptoTotal'
    ])
  }
}
</script>

<style>
.container.stocks {
  padding-bottom: 20px;
}
.total {
  font-size: 1.5rem;
}
</style>

