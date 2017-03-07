<template lang="pug">

.section.news-list
  .container
    article.media(v-for='flight in flights')
      .media-content
          h3.title {{flight.departureAirport}} to {{ flight.arrivalAirport}}
          h5.subtitle The lowest rate for {{ flight.departureDate | formatDate }} is: {{ flight.price | currency }}
          .columns
            .column 
              div Outbound {{ flight.doc.itineraries[0].outbound.flights.length }} Segments:
              div(v-for='(itinerary, index) in flight.doc.itineraries[0].outbound.flights') 
                span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}} ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) 
            .column 
              div Return {{ flight.doc.itineraries[0].inbound.flights.length }} Segments:
              div(v-for='(itinerary, index) in flight.doc.itineraries[0].inbound.flights') 
                span From: {{ itinerary.origin.airport }} --> To : {{ itinerary.destination.airport}} ({{itinerary.departs_at | formatTime}} - {{itinerary.arrives_at | formatTime}}) 
</template>

<script>
const flatten = require('flatten')

export default {
  name: 'flights',
  data () {
    return {
      flights: []
    }
  },
  methods: {},
  created: function () {
    this.$http.get('http://hotsexcoffee.com/api/cheap-flights')
      .then(response => {
        this.flights = flatten(response.data)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

