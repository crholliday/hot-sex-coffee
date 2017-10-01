<template lang="pug">
  .container.home
    p.title.is-2 Cheap Flights
    .subtitle.is-6 Last updated: {{lastUpdated | formatDateHuman}} 
      | | {{ count }} total records
    .columns.is-multiline
      .column.is-one-quarter(v-for='flight in flights')
        .box
          article.media          
            .media-left
              p.title.green {{flight.price | currency}} 
              span.tag.is-primary(v-if='isNew(flight.created)') New!
            .media-content 
              .content 
                h4.title.is-4 {{flight.departureAirport}} to {{flight.arrivalAirport}}
                h5.subtitle.is-6.gray Average: {{flight.averagePrice | currency}}
                p: small Created: {{flight.created | formatDateHuman}}
    stock-list
    crypto-list
</template>

<script>
const config = require('../config')
const moment = require('moment')
import StockList from '../components/StockList.vue'
import CryptoList from '../components/CryptoList.vue'

export default {
  name: 'home',
  components: {
    StockList,
    CryptoList
  },
  data () {
    return {
      flights: [],
      lastUpdated: '',
      count: 0
    }
  },
  methods: {
    isNew: function (created) {
      return moment.duration(Date.now() - moment(created)).asDays() < 1
    }
  },
  created: function () {
    this.$http.get(config.api_base_url + '/cheap-flight-by-route')
      .then(response => {
        this.flights = response.data
      })
    this.$http.get(config.api_base_url + '/flights-stats')
      .then(response => {
        this.lastUpdated = response.data.latestDate
        this.count = response.data.recordCount
      })
  }
}
</script>

<style>
  .container.home {
    padding-top: 20px
  }

  .h5.subtitle.h5.gray {
    color: gray;
  }

  .title.green {
    color: green;
    font-weight: 500;
  }
</style>
