<template lang="pug">
  .container.routes
    .columns
        .column.is-9(v-if='cryptos')
          h3.title.h3 List of Crypto Transactions
          table.table.is-striped.is-narrow
            thead
              tr
                th Currency
                th Txn Date
                th Amount
                th Fee
                th Cost
                th Nominal Rate
                th Transaction
                th Edit
            tbody
              tr(v-for='crypto in orderBy(cryptos, "date")')
                td {{ crypto.currency }}
                td {{ crypto.date | formatDate}}
                td {{ crypto.amount }}
                td {{ crypto.fee }}
                td {{ crypto.cost | currency }}
                td {{ divide(crypto.cost, crypto.amount) | currency}}
                td {{ crypto.txn | truncate(20)}}
                td: a(@click='deleteCrypto(crypto._id)') remove
        .column.is-9(v-else)
          div
            i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
            .sr-only Loading...      
        .column.is-3
          .box
            h3.title.h3 Add a new crypto txn
            label.label Currency
            p.control
              input.input(type='text' placeholder='Currency' v-model='currency')
            label.label Txn Date
            p.control
              input.input(type='date' placeholder='Txn Date' v-model='txnDate')
            label.label Amount
            p.control
              input.input(type='number' placeholder='Amount' v-model='amount')
            label.label Fee
            p.control
              input.input(type='number' placeholder='Fee' v-model='fee')
            label.label Cost
            p.control
              input.input(type='number' placeholder='Cost' v-model='cost')
            label.label Txn
            p.control
              input.input(type='text' placeholder='Txn' v-model='txn')
            hr
            p.control
              button.button.is-primary(@click.prevent='createCrypto()') Create Crypto

</template>

<script>
require('moment-duration-format')
const config = require('../config')

export default {
  name: 'crypto',
  components: {

  },
  data () {
    return {
      cryptos: [],
      currency: '',
      amount: 0.00,
      fee: 0.00,
      cost: 0.00,
      txn: '',
      txnDate: ''
    }
  },
  methods: {
    loadCryptos: function () {
      this.$http.get(config.api_base_url + '/cryptos')
            .then(response => {
              this.cryptos = response.data
            })
    },
    createCrypto: function () {
      let crypto = {
        currency: this.currency,
        amount: this.amount,
        date: this.txnDate,
        fee: this.fee,
        cost: this.cost,
        txn: this.txn
      }
      this.$http.post(config.api_base_url + '/crypto', crypto)
            .then(response => {
              this.loadCryptos()
            })
    },
    deleteCrypto: function (id) {
      this.$http.delete(config.api_base_url + '/crypto/' + id)
      .then(response => {
        this.loadCryptos()
      })
    },
    divide: function (e, d) {
      return e / d
    }
  },
  created: function () {
    this.loadCryptos()
  }
}

</script>

<style>
  .container.routes {
    padding-top: 1.5rem;
  }
</style>
