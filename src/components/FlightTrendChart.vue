<template lang="pug">
.columns
  .column.is-11.is-offset-1
    .card
      bar-chart(v-bind:chartData='chartData' 
                v-bind:options='chartOptions' 
                v-bind:height='340', v-bind:width='960' )
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
      cheapFlightsByEndpoint: [],
      chartOptions: {}
    }
  },
  computed: {
    title: function () {
      return 'Flights from ' + this.origin + ' to ' + this.destination
    }
  },
  methods: {
    loadCheapFlightsByEndpoint: function (origin, destination) {
      axios.get(config.api_base_url + '/flights-by-endpoints?origin=' + origin + '&destination=' + destination)
        .then(response => {
          this.cheapFlightsByEndpoint = response.data
          this.chartData = this.makeChartData()
          console.log(this.title)
          this.chartOptions = this.makeChartOption(this.title)
        })
    },
    makeChartOption: function (title) {
      return {
        responsive: false,
        title: {
          display: true,
          text: title,
          fontSize: 16
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    },
    makeChartData: function () {
      let dates = this.cheapFlightsByEndpoint.map(function (a) { return moment(a.created).format('MM/DD/YYYY') })
      let lowPrices = this.cheapFlightsByEndpoint.map(function (a) { return a.low_price })
      let avgPrices = this.cheapFlightsByEndpoint.map(function (a) { return a.avg_price })
      let data = {
        labels: dates,
        datasets: [
          {
            label: 'Low Prices',
            borderWidth: 1,
            pointRadius: 2,
            data: lowPrices,
            backgroundColor: 'rgba(0, 14, 14, 0.57)'
          },
          {
            label: 'Avg Prices',
            borderWidth: 1,
            pointRadius: 2,
            data: avgPrices,
            backgroundColor: 'rgba(4, 112, 110, 0.57)'
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
