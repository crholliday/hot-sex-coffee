<template lang="pug">
  .container.routes
    .columns
        .column.is-9
          h3.title.h3 List of Routes
          table.table.is-striped.is-narrow
            thead
              tr
                th Depart From
                th Arrive To
                th From Now
                th Duration
                th Is Active
                th Class
                th Edit
            tbody
              tr(v-for='route in routes')
                td {{ route.departureAirport }}
                td {{ route.arrivalAirport }}
                td {{ route.fromNow }}
                td {{ route.durationDays }}
                td {{ route.class }}
                td {{ route.isActive }}
                td: a(@click='deleteRoute(route._id)') remove
        .column.is-3
          .box
            h3.title.h3 Add a new route
            label.label Departure
            p.control
              input.input(type='text' placeholder='Departure airport' v-model='departureAirport')
            label.label Arrival
            p.control
              input.input(type='text' placeholder='Arrival airport' v-model='arrivalAirport')
            label.label Duration in Days
            p.control
              input.input(type='text' placeholder='Duration in days' v-model='durationDays')
            label.label Days from now
            p.control
              input.input(type='text' placeholder='Days from now' v-model='fromNow')
            hr
            p.control
              button.button.is-primary(@click.prevent='createRoute()') Create Route

</template>

<script>
require('moment-duration-format')
const config = require('../config')

export default {
  name: 'routes',
  components: {

  },
  data () {
    return {
      routes: [],
      arrivalAirport: '',
      class: 'all',
      departureAirport: '',
      durationDays: 0,
      fromNow: 0
    }
  },
  methods: {
    loadFlights: function () {
      this.$http.get(config.api_base_url + '/travel-routes')
            .then(response => {
              this.routes = response.data
            })
    },
    createRoute: function () {
      let route = {
        arrivalAirport: this.arrivalAirport,
        class: 'any',
        departureAirport: this.departureAirport,
        durationDays: this.durationDays,
        fromNow: this.fromNow,
        isActive: true
      }
      this.$http.post(config.api_base_url + '/travel-route', route)
            .then(response => {
              this.loadFlights()
            })
    },
    deleteRoute: function (id) {
      this.$http.delete(config.api_base_url + '/travel-route/' + id)
      .then(response => {
        this.loadFlights()
      })
    }
  },
  created: function () {
    this.loadFlights()
  }
}

</script>

<style>
  .container.routes {
    padding-top: 1.5rem;
  }
</style>
