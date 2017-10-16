<template lang="pug">
.column.is-one-quarter
  .box.bloom
    article.media
      div(v-if='loading')
        i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
        .sr-only Loading...
      a.media-content(v-else @click='$router.push({name: "Crypto"})')
        .content.kpi
          transition(name='fade' mode='out-in')
            h1.title.is-3(v-bind:key='get_amount') {{ get_amount | currency('$', decimals) }}
          h6.subtitle.h6.gray {{title}}
          .info
            p {{ currency_owned }} owned <br />
              span {{ pct_change }} ({{ currency_owned_gain | currency }}) <br />
              span.has-text-success Total: {{ currency_owned_value | currency }} <br />
              span.has-text-success Cost: {{ owned_cost | currency }} 
            p: small last tick:  {{ latest_date | formatDateHuman}}
  
</template>

<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
const config = require('../config')
import moment from 'moment'

export default {
  name: 'crypto-live',
  data () {
    return {
      loading: false,
      currency_owned: 0.00,
      latest_date: '',
      owned_cost: 1800.00,
      total_fee: 0.0
    }
  },
  props: {
    title: {type: String, required: true},
    currency: {type: String, required: true},
    decimals: {type: Number, required: true}
  },
  computed: {
    ...mapGetters([
      'getBtcUsdTradeValue',
      'getIotUsdTradeValue',
      'bitfinexWebSocketConnected',
      'bitfinexWebSocketError'
    ]),
    currency_owned_gain: function () {
      return (this.currency_owned * this.get_amount) - this.owned_cost
    },
    currency_owned_value: function () {
      return this.currency_owned * this.get_amount
    },
    pct_change: function () {
      return (100 * (this.currency_owned_gain / this.owned_cost)).toFixed(1) + '%'
    },
    get_amount: function () {
      if (this.currency === 'BTC') {
        return this.getBtcUsdTradeValue
      } else if (this.currency === 'IOT') {
        return this.getIotUsdTradeValue
      }
    }
  },
  methods: {
    ...mapActions([
      'upsertCrypto'
    ]),
    getCryptoTotals: function () {
      axios.request(config.api_base_url + '/crypto-totals')
        .then(response => {
          const index = response.data.findIndex(item => item.currency === this.currency)
          let data = response.data[index]
          this.owned_cost = data.totalCost
          this.currency_owned = data.totalCrypto - data.totalFee
          this.total_fee = data.totalFee
          this.total_cost = data.owned_cost
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  watch: {
    get_amount: function (data) {
      this.upsertCrypto({currency: this.currency, amount: this.currency_owned_value})
      this.latest_date = moment(Date.now())
    }
  },
  mounted () {
    this.getCryptoTotals()
  }
}
</script>

<style>
.info {
  color: gray;
}
.container.bitcoin {
  padding-bottom: 20px;
}
.content.kpi {
  align-content: center;
  text-align: center;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: text-shadow .5s ease-in-out;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /*opacity: 0;*/
  text-shadow: 0 0 3px lightgreen;
}

/* The slow way */
.bloom{
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Transition to a bigger shadow on hover */
.bloom:hover {
  box-shadow: 0 5px 16px rgba(0,0,0,0.3);
}

.load {
  z-index: 1000
}

</style>

