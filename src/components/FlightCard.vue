<template lang='pug'>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'flight-card',
  props: ['flight'],
  computed: {
    ...mapGetters([
      'airlines'
    ])
  },
  methods: {
    ...mapActions([
      'loadAirlines'
    ]),
    duration: function (start, finish) {
      let ms = moment(finish).diff(moment(start))
      return moment.duration(ms, 'ms').format('h[h] mm[m]')
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
  }
}
</script>

<style>
.card-header {
  background-color: lightgrey
}

.card {
  height: 100%;
}
</style>
