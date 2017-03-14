<template>

.section.news-list
  .container
    article.media(v-for='flight in flights')
      flight(thisFlight='flight')
</template>

<script>
export default {
  name: 'flight-list',
  props: {
    flights: []
  },
  data () {
    return {
      flights: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

</style>
