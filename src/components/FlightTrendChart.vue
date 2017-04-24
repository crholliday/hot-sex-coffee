<template lang="pug">
.columns
  .column.is-11.is-offset-1
    .card
      bar-chart(v-bind:chartData='chartData' 
                v-bind:options='{ maintainAspectRatio: false}' 
                v-bind:height='350' )
</template>

<script>
const moment = require('moment')
const axios = require('axios')
const config = require('../config')
import BarChart from '../components/BarChart.js'

require('moment-duration-format')

export default {
  name: 'flight-trend-chart',
  components: {
    BarChart
  },
  data () {
    return {
      chartData: {},
      cheapFlightsByEndpoint: []
    }
  },
  methods: {
    loadCheapFlightsByEndpoint: function (origin, destination) {
      axios.get(config.api_base_url + '/flights-by-endpoints?origin=' + origin + '&destination=' + destination)
        .then(response => {
          this.cheapFlightsByEndpoint = response.data
          this.chartData = this.makeChartData(origin, destination)
        })
    },
    makeChartData: function (a, b) {
      let dates = this.cheapFlightsByEndpoint.map(function (a) { return moment(a.created).format('MM/DD/YYYY') })
      let lowPrices = this.cheapFlightsByEndpoint.map(function (a) { return a.low_price })
      let avgPrices = this.cheapFlightsByEndpoint.map(function (a) { return a.avg_price })
      let data = {
        labels: dates,
        datasets: [
          {
            label: 'Low Prices',
            borderWidth: 1,
            data: lowPrices,
            backgroundColor: '#80DEEA'
          },
          {
            label: 'Avg Prices',
            borderWidth: 1,
            data: avgPrices,
            backgroundColor: '#81D4FA'
          }
        ]
      }
      return data
    }
  },
  props: {
    origin: {type: String, required: true},
    destination: {type: String, required: true}
  },
  created: function () {
    this.loadCheapFlightsByEndpoint(this.origin, this.destination)
  },
  watch: {
    origin: function () {
      this.loadCheapFlightsByEndpoint(this.origin, this.destination)
    },
    destination: function () {
      this.loadCheapFlightsByEndpoint(this.origin, this.destination)
    }
  }
}
</script>

<style>

</style>
