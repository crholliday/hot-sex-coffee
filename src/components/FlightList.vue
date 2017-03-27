<template lang="pug">
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

<style>

</style>
