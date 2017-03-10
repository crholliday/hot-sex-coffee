<template lang="pug">

.section.news-list
  .container
    article.media(v-for='flight in flights')
      .media-left
        span.tag.is-primary.is-large: strong {{ flight.price | currency }}
      .media-content
          h3.title {{flight.departureAirport}} to {{ flight.arrivalAirport}}
          h5.subtitle Rate {{ flight.departureDate | formatDate }} to {{ flight.returnDate | formatDate }} : 
          .columns
            .column 
              div Outbound {{ flight.doc.itineraries.outbound.flights.length }} 
                | segments ({{ duration(flight.departureFirstFlight.departs_at, flight.departureLastFlight.arrives_at) }}):
              div(v-for='itinerary in flight.doc.itineraries.outbound.flights') 
                span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}}
                  | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) on {{ getAirlineName(itinerary.marketing_airline) }}
            .column 
              div Return {{ flight.doc.itineraries.inbound.flights.length }} 
                | Segments ({{ duration(flight.returnFirstFlight.departs_at, flight.returnLastFlight.arrives_at) }}):
              div(v-for='itinerary in flight.doc.itineraries.inbound.flights') 
                span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}}
                  | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) on {{ getAirlineName(itinerary.marketing_airline) }}


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
      airlines: []
    }
  },
  methods: {
    duration: function (start, finish) {
      let ms = moment(finish).diff(moment(start))
      return moment.duration(ms, 'ms').format('h [hrs] m [min]')
    },
    getAirlineName: function (code) {
      let airline = this.airlines.find(x => x.IATA === code)
      if (!airline) {
        return code
      }
      return airline.Airline
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

