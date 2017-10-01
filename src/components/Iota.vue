<template lang="pug">
  .container
    IotaStats
    .tile.is-ancestor
      .tile.is-parent.is-vertical
        .tile-is-child.box
          IotaArbitrage
        .tile-is-child.box
          .title Neighbors Go Here
      .tile.is-parent.is-5
        .tile.is-child
          IotaSocket    
    
    br
    br
    
</template>

<script>
import IotaStats from 'components/IotaStats'
import IotaSocket from 'components/IotaSocket'
import IotaArbitrage from 'components/IotaArbitrage'

export default {
  name: 'iota',
  components: {
    IotaStats,
    IotaSocket,
    IotaArbitrage
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
