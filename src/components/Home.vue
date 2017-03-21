<template lang="pug">
  .container.home
    p.title.is-2 Cheap Flights
    .columns.is-vcentered
      .column(v-for='flight in flights')
        .box
          article.media          
            .media-left
              p.title.is-3.green {{flight.price | currency}}
            .media-content 
              .content 
                h3.title.h3 {{flight.departureAirport}} to {{flight.arrivalAirport}}
                h6.subtitle.h6.gray Average: {{flight.averagePrice | currency}}
                p: small Created: {{flight.created | formatDateHuman}}
    .section

</template>

<script>
const config = require('../config')

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
