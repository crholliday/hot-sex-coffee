<template lang="pug">
.content.stats
    nav.level
      .level-item.has-text-centered
        div
          p.heading Version
          p.title {{data.appVersion}}
      .level-item.has-text-centered
        div
          p.heading Synched
          p.title {{ (data.latestMilestoneIndex - data.latestSolidSubtangleMilestoneIndex) < 2 | capitalize}}
      .level-item.has-text-centered
        div
          p.heading Neighbors
          p.title {{data.neighbors}}
      .level-item.has-text-centered
        div
          p.heading Tips
          p.title {{data.tips}}  
</template>

<script>
// import axios from 'axios'
import IOTA from 'iota.lib.js'
import config from '../config'
const iota = new IOTA({'provider': config.iota_node_url})

export default {
  name: 'iota-stats',
  data () {
    return {
      loading: false,
      data: {}
    }
  },
  methods: {
    loadData: function () {
      this.loading = true
      let vm = this
      iota.api.getNodeInfo(function (error, success) {
        if (error) {
          console.error(error)
        } else {
          vm.data = success
          vm.loading = false
        }
      })
    }
  },
  created: function () {
    this.loadData()
  }

}
</script>

<style>
.content.stats {
  padding: 1.5rem;
}
</style>

