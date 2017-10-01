<template lang="pug">
.box.iota
  ConnectedButton(:connected='socketConnected')
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
  a.box.is-marginless(v-for='msg in filteredTransactions' )  
    .columns
      .column.is-7.is-paddingless
        div Tx: {{msg.hash | truncate(18)}}
        div Tag: {{msg.tag | truncate(20)}}
        small  {{ getDate(msg.timestamp) | formatDateHuman | capitalize}}
      .column.is-paddingless
        div Amount: {{msg.amount}}      
        div Current Index: {{msg.currentIndex}}
        div Last Index:  {{msg.lastIndex}}
      
  
</template>


<script>
import moment from 'moment'
const NumberOfRetries = 20
import ConnectedButton from './ConnectedButton'

export default {
  name: 'iota-socket',
  components: {
    ConnectedButton
  },
  data () {
    return {
      loading: false,
      filter: 'all', // all, non-zero
      retries: 0,
      msgs: [],
      socketConnected: this.$socket.connected
    }
  },
  sockets: {
    connect: function () {
      console.log('Connected to IOTA websocket')
    },
    tx: function (val) {
      let data = (JSON.parse(event.data.slice(2)))
      let vm = this
      if (this.filter === 'non-zero') {
        if (data[1].amount !== '0') {
          vm.msgs.unshift(data[1])
        }
      } else {
        vm.msgs.unshift(data[1])
      }

      this.msgs.length > 10 ? this.msgs.pop() : this.msgs
    },
    error: function (err) {
      if (this.retries >= NumberOfRetries) {
        this.$socket.disconnect()
        console.log('Disconnecting from IOTA websocket after 20 errors...')
      } else {
        this.retries += 1
        console.error('Error with he IOTA websocket: ', err)
      }
    },
    connect_error: function (err) {
      if (this.retries >= NumberOfRetries) {
        this.$socket.disconnect()
        console.log('Disconnecting from IOTA websocket after 20 errors...')
      } else {
        this.retries += 1
        console.error('Error connecting to IOTA websocket: ', err)
      }
    }
  },
  computed: {
    filteredTransactions: function () {
      if (this.filter === 'non-zero') {
        return this.msgs.filter(function (msg) {
          return msg.amount !== '0'
        })
      } else if (this.filter === 'positive') {
        return this.msgs.filter(function (msg) {
          return parseInt(msg.amount) > 0
        })
      } else {
        return this.msgs
      }
    }
  },
  methods: {
    getDate: function (dateString) {
      return moment.unix(dateString)
    }
  },
  mounted () {
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
.load {
  z-index: 1000
}

</style>

