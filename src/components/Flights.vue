<template lang="pug">

.container
  .box
    nav.level
      .level-left
        .level-item
          p.control.has-addons
            router-link(to='/routes') Manage routes
      .level-right
        p.level-item(v-for='route in distinctRoutes')
           a(@click='setEndpoints(route.departureAirport, route.arrivalAirport)') 
            | {{route.departureAirport}} to {{route.arrivalAirport}}
        p.level-item: a.button.is-success(@click='setEndpoints("","")') All
  .spacer
  .section.news-list
    .container
      .columns
        .column.is-11.is-offset-1
          .card(v-if='chartData != null')
            bar-chart(v-bind:data='chartData' 
                      v-bind:options='{ maintainAspectRatio: false}' 
                      v-bind:height='350' )
      article.media(v-for='flight in filteredFlights')
        .media-left
          span.tag.is-primary.is-large: strong {{ flight.price | currency }}
        .media-content
          .columns
            .column.is-9
              h3.title {{flight.departureAirport}} to {{ flight.arrivalAirport}} for {{durationAsDays(flight.departureDate, flight.returnDate)}} days
              h5.subtitle.is-6 Rate from 
                strong {{ flight.docCreated | formatDateHuman }}
            .column.is-3
              div Price Trend <br />
              peity( v-bind:type='"bar"' 
                     v-bind:options='{width: 70}' 
                     v-bind:data='trendData(flight.departureAirport, flight.arrivalAirport)')
          .columns
            .column 
              .card
                header.card-header 
                  p.card-header-title 
                    i.fa.fa-arrow-right  Outbound: {{ flight.departureDate | formatDate }}
                .card-content
                  div: u {{ flight.doc.itineraries.outbound.flights.length }} 
                    | segments ({{ duration(flight.departureFirstFlight.departs_at, flight.departureLastFlight.arrives_at) }}):
                  div(v-for='itinerary in flight.doc.itineraries.outbound.flights') 
                    span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}} 
                      | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) 
                    div: small {{ getAirlineName(itinerary.marketing_airline) }} - {{ itinerary.flight_number }}
            .column 
              .card
                header.card-header 
                  p.card-header-title 
                    i.fa.fa-arrow-left  Return:  {{ flight.returnDate | formatDate }}
                .card-content
                  div: u {{ flight.doc.itineraries.inbound.flights.length }} 
                    | Segments ({{ duration(flight.returnFirstFlight.departs_at, flight.returnLastFlight.arrives_at) }}):
                  div(v-for='itinerary in flight.doc.itineraries.inbound.flights') 
                    span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}} 
                      | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) 
                    div: small {{ getAirlineName(itinerary.marketing_airline) }} - {{ itinerary.flight_number }}


</template>

<script>
const moment = require('moment')
require('moment-duration-format')
const config = require('../config')
import Peity from 'vue-peity'
import BarChart from '../components/BarChart.js'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'flights',
  data () {
    return {
      endPoints: '',
      routeTrends: [],
      chartData: null,
      loading: true
    }
  },
  components: {
    Peity,
    BarChart
  },
  computed: {
    ...mapGetters([
      'airlines',
      'cheapFlights',
      'cheapFlightsByDay',
      'distinctRoutes'
    ]),
    filteredFlights: function () {
      if (this.cheapFlights.length === 0) {
        this.loadCheapFlights()
      }
      if (typeof this.endPoints !== 'undefined' && this.endPoints !== '') {
        let self = this
        return this.cheapFlights.filter(function (flight) {
          return flight.departureAirport === self.endPoints.split(',')[0] &&
                flight.arrivalAirport === self.endPoints.split(',')[1]
        })
      }
      return this.cheapFlights
    }
  },
  methods: {
    ...mapActions([
      'loadAirlines',
      'loadCheapFlights',
      'loadCheapFlightsByDay',
      'loadRoutes'
    ]),
    trendData: function (start, end) {
      if (this.cheapFlightsByDay.length === 0) {
        this.loadCheapFlightsByDay()
      }
      return this.cheapFlightsByDay.filter(function (trend) {
        return trend.departureAirport === start &&
          trend.arrivalAirport === end
      }).map(function (trend) {
        return trend.price
      }).toString()
    },
    returnUTC: function (someDate) {
      console.log(moment.utc(someDate))
    },
    duration: function (start, finish) {
      let ms = moment(finish).diff(moment(start))
      return moment.duration(ms, 'ms').format('h[h] mm[m]')
    },
    durationAsDays: function (start, finish) {
      let ms = moment(finish).diff(moment(start))
      return moment.duration(ms, 'ms').asDays()
    },
    getAirlineName: function (code) {
      if (this.airlines.length === 0) {
        this.loadAirlines()
      }
      let airline = this.airlines.find(x => x.IATA === code)
      if (!airline) {
        return code
      }
      return airline.Airline
    },
    setEndpoints: function (a, b) {
      this.chartData = null
      if (a === '') {
        this.endPoints = ''
        this.chartData = null
      } else {
        this.endPoints = a + ',' + b
        this.$http.get(config.api_base_url + '/flights-by-endpoints?origin=' + a + '&destination=' + b)
          .then(response => {
            this.routeTrends = response.data
            this.loading = false
            this.chartData = this.makeChartData(a, b)
          })
      }
    },
    makeChartData: function (a, b) {
      let dates = this.routeTrends.map(function (a) { return moment(a.created).format('MM/DD/YYYY') })
      let lowPrices = this.routeTrends.map(function (a) { return a.low_price })
      let avgPrices = this.routeTrends.map(function (a) { return a.avg_price })
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
  created: function () {
    if (this.distinctRoutes.length === 0) {
      this.loadRoutes()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card-header {
  background-color: lightgrey
}

.card {
  height: 100%;
}
.card.chart {
  height: 350px;
  margin-bottom: 1.5rem;
}
.box {
  margin-top: 1rem
}

</style>

