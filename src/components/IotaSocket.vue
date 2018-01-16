<template lang="pug">
.box.iota
  ConnectedButton(:connected='iotaSocketConnected')
  .title Current Transactions
  .content
    nav.level
        .level-item
          a.is-active(@click='filter = "all"') All
        .level-item |
        .level-item
          a(@click='filter = "non-zero"') Non-zero
        .level-item |
        .level-item
          a(@click='filter = "positive"') Positive
  .spacer
  transition-group(name="list" )
    IotaCard(v-for="(msg) in filteredTransactions" v-bind:key="msg.address"
                                                  class="list-item" 
                                                  v-bind:msg="msg" 
                                                  v-bind:iotUsdTradeValue="getIotUsdTradeValue"
                                                  v-bind:iotBtcTradeValue="getIotBtcTradeValue")  
        
  
</template>


<script>
import ConnectedButton from './ConnectedButton'
import IotaCard from './IotaCard'
import {mapGetters} from 'vuex'

export default {
  name: 'iota-socket',
  components: {
    ConnectedButton,
    IotaCard
  },
  data () {
    return {
      loading: false,
      filter: 'non-zero', // all, non-zero
      socketConnected: false
    }
  },
  computed: {
    ...mapGetters([
      'iotaTransactions',
      'iotaSocketConnected',
      'getIotUsdTradeValue',
      'getIotBtcTradeValue'
    ]),
    filteredTransactions: function () {
      if (this.filter === 'non-zero') {
        return this.iotaTransactions.filter(function (msg) {
          return msg.amount !== '0' && msg.currentIndex === '0'
        }).slice(0, 10)
      } else if (this.filter === 'positive') {
        return this.iotaTransactions.filter(function (msg) {
          return parseInt(msg.amount) > 0
        }).slice(0, 10)
      } else {
        return this.iotaTransactions.slice(0, 10)
      }
    }
  }
}
</script>

<style scoped>
.container.iota {
  padding-bottom: 20px;
}
.content.tx {
  padding: .25rem;
  margin-bottom: .5rem;
}
.list-enter-active, .list-leave-active {
  transition: all .7s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.load {
  z-index: 1000
}

</style>

