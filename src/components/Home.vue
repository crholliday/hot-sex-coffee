<template lang="pug">
  .container.home
    p.title.is-2 Cheap Flights
    .columns
      .column(v-for='flight in flights')
        .box
          article.media          
            .media-left
              p.title.is-3.green {{flight.price | currency}} 
              span.tag.is-primary(v-if='isNew(flight.created)') New!
            .media-content 
              .content 
                h3.title.h3 {{flight.departureAirport}} to {{flight.arrivalAirport}}
                h6.subtitle.h6.gray Average: {{flight.averagePrice | currency}}
                p: small Created: {{flight.created | formatDateHuman}}
    .section
</template>

<script>
const config = require('../config')
const moment = require('moment')

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      flights: []
    }
  },
  methods: {
    isNew: function (created) {
      return moment.duration(Date.now() - moment(created)).asDays() < 1
    }
  },
  created: function () {
    this.$http.get(config.api_base_url + '/cheap-flight-by-route')
      .then(response => {
        this.flights = response.data
      })
  }
}
</script>

<style>
  .container.home {
    padding-top: 20px
  }

  .h5.subtitle.h5.gray {
    color: gray;
  }

  .title.is-3.green {
    color: green;
    font-weight: 500;
  }
</style>
