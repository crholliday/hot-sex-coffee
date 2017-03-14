<template lang="pug">

.container
  .box
    nav.level
      .level-left
        .level-item
          p.control.has-addons
            router-link(to='/routes') Manage routes
      .level-right
        p.level-item(v-for='route in routes')
           a(@click='setEndpoints(route.departureAirport, route.arrivalAirport)') 
            | {{route.departureAirport}} to {{route.arrivalAirport}}
        p.level-item: a.button.is-success(@click='endPoints = ""') All
  .spacer
  .section.news-list
    .container
      article.media(v-for='flight in filteredFlights')
        .media-left
          span.tag.is-primary.is-large: strong {{ flight.price | currency }}
        .media-content
            h3.title {{flight.departureAirport}} to {{ flight.arrivalAirport}} for {{durationAsDays(flight.departureDate, flight.returnDate)}} days
            h5.subtitle.is-6 Rate from 
              strong {{ flight.docCreated | formatDateHuman }}
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

export default {
  name: 'flights',
  data () {
    return {
      flights: [],
      airlines: [],
      routes: [],
      endPoints: ''
    }
  },
  computed: {
    filteredFlights: function () {
      if (typeof this.endPoints !== 'undefined' && this.endPoints !== '') {
        let self = this
        return this.flights.filter(function (flight) {
          return flight.departureAirport === self.endPoints.split(',')[0] &&
                flight.arrivalAirport === self.endPoints.split(',')[1]
        })
      }
      return this.flights
    }
  },
  methods: {
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
      let airline = this.airlines.find(x => x.IATA === code)
      if (!airline) {
        return code
      }
      return airline.Airline
    },
    setEndpoints: function (a, b) {
      console.log('a and b are:' + a + ', ' + b)
      if (a === '') {
        this.endPoints = ''
      }
      this.endPoints = a + ',' + b
    }
  },
  created: function () {
    this.$http.get(config.api_base_url + '/cheap-flights')
      .then(response => {
        this.flights = response.data
      })

    this.$http.get(config.api_base_url + '/airlines')
      .then(response => {
        this.airlines = response.data
      })

    this.$http.get(config.api_base_url + '/distinct_routes')
      .then(response => {
        this.routes = response.data
      })
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

.box {
  margin-top: 1rem
}

</style>

