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
           a(@click='origin = route.departureAirport, destination = route.arrivalAirport') 
            | {{route.departureAirport}} to {{route.arrivalAirport}}
        p.level-item: a.button.is-success(@click='origin = "", destination = ""') All
  .spacer
  .section.news-list
    .container
      flight-trend-chart(v-if='origin && destination' v-bind:origin='origin' v-bind:destination='destination')
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
          flight-card(v-bind:flight='flight')
</template>

<script>
const moment = require('moment')
require('moment-duration-format')
import Peity from 'vue-peity'
import FlightTrendChart from '../components/FlightTrendChart.vue'
import FlightCard from '../components/FlightCard.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'flights',
  data () {
    return {
      origin: '',
      destination: '',
      flightData: [],
      routeTrends: [],
      chartData: null,
      loading: true
    }
  },
  components: {
    Peity,
    FlightTrendChart,
    FlightCard
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
      if (typeof this.origin !== 'undefined' && this.origin !== '') {
        let self = this
        return this.cheapFlights.filter(function (flight) {
          return flight.departureAirport === self.origin &&
                flight.arrivalAirport === self.destination
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

