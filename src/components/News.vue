<template lang="pug">
  .container
    SourceSelection(v-on:sourceChanged='sourceChanged')
    Newslist(v-bind:source='source')
</template>

<script>
import Newslist from 'components/Newslist'
import SourceSelection from 'components/SourceSelection'

export default {
  name: 'news',
  components: {
    Newslist,
    SourceSelection
  },
  data () {
    return {
      source: ''
    }
  },
  methods: {
    sourceChanged: function (source) {
      this.source = source
    }
  }
}
</script>

<style>
  #app {
    padding-top: 20px
  }
</style>
