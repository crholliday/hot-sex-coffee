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
                  | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) on {{ itinerary.marketing_airline }}
            .column 
              div Return {{ flight.doc.itineraries.inbound.flights.length }} 
                | Segments ({{ duration(flight.returnFirstFlight.departs_at, flight.returnLastFlight.arrives_at) }}):
              div(v-for='itinerary in flight.doc.itineraries.inbound.flights') 
                span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}}
                  | ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) on {{ itinerary.marketing_airline }}


</template>

<script>
const moment = require('moment')
require('moment-duration-format')

export default {
  name: 'flights',
  data () {
    return {
      flights: []
    }
  },
  methods: {
    duration: function (start, finish) {
      let ms = moment(finish).diff(moment(start))
      return moment.duration(ms, 'ms').format('h [hrs] m [min]')
    },
    getAirlineName: function (code) {
      this.$http.get('http://localhost:3000/airlines/' + code)
        .then(response => {
          return response.data.Airline
        })
    }
  },
  created: function () {
    // this.$http.get('http://hotsexcoffee.com/api/cheap-flights')
    this.$http.get('http://localhost:3000/cheap-flights')
      .then(response => {
        this.flights = response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

