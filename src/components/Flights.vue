<template lang="pug">

  .section.news-list
    .container
      article.media(v-for='flight in flights')
        .media-content
          .content
            h4 from {{flight.departureAirport}} to {{ flight.arrivalAirport}}
            h6.byline 
              p The lowest rate for {{ flight.departureDate | formatDate }} is: {{ flight.price | currency }}
</template>

<script>
export default {
  name: 'flights',
  data () {
    return {
      flights: []
    }
  },
  methods: {},
  created: function () {
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

