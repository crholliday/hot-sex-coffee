<template lang="pug">
.container.stocks
  p.title.is-2 Crypto List <span class='total'>Total Value: ( {{cryptoTotal | currency}} )</span>
    ConnectedButton(:connected='bitfinexWebSocketConnected')
  .columns.is-multiline
      CryptoLive(v-bind:title='"Bitcoin"' 
                 v-bind:currency='"BTC"' 
                 v-bind:decimals='2')
      CryptoLive(v-bind:title='"IOTA"' 
                 v-bind:currency='"IOT"'
                 v-bind:decimals='6')      
</template>

<script>
import CryptoLive from '../components/CryptoLive.vue'
import {mapGetters} from 'vuex'
import ConnectedButton from './ConnectedButton'

export default {
  name: 'crypto-list',
  components: {
    CryptoLive,
    ConnectedButton
  },
  computed: {
    ...mapGetters([
      'cryptoTotal',
      'bitfinexWebSocketConnected'
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

