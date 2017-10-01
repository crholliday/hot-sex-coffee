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
            h1.title.h1(v-bind:key='amount') ${{ amount }}
            h6.subtitle.h6.gray {{title}}
          p {{ currency_owned }} owned <br />
            span {{ pct_change }} ({{ currency_owned_gain | currency }}) <br />
            span.has-text-success Total: {{ currency_owned_value | currency }} <br />
            span.has-text-success Cost: {{ owned_cost | currency }} 
          p: small last tick:  {{ latest_date | formatTime}}
  
</template>


<script>
import axios from 'axios'
import { mapActions } from 'vuex'
const config = require('../config')

export default {
  name: 'crypto-summary',
  data () {
    return {
      loading: false,
      name: 'OMG',
      latest_date: '',
      avg_price_paid: 0.00,
      total_paid: 0.00,
      total_value: 1800.00
    }
  },
  props: {
    title: { type: String, required: true },
    currency: { type: String, required: true }
  },
  computed: {
    currency_owned_gain: function () {
      return (this.currency_owned * this.amount) - this.owned_cost
    },
    currency_owned_value: function () {
      return this.currency_owned * this.amount
    },
    pct_change: function () {
      return (100 * (this.currency_owned_gain / this.owned_cost)).toFixed(1) + '%'
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
  mounted () {
    this.loadData()
    this.getCryptoTotals()
  }
}
</script>

<style>
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
  transition: all .5s ease;
  background-color: lightgreen;
}

.fade-enter,
.fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
  /*opacity: 0;*/
  background-color: transparent;
}


/* The slow way */

.bloom {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s ease-in-out;
}


/* Transition to a bigger shadow on hover */

.bloom:hover {
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
}

.load {
  z-index: 1000
}
</style>

