<template lang="pug">
.content.stats
    nav.level
      .level-item.has-text-centered
        div
          p.heading Synched
          p.title(v-if="is_synched") {{ String(is_synched) | capitalize}}
          p.title.is-size-4.has-text-grey(v-else) {{data.latestMilestoneIndex}} | {{data.latestSolidSubtangleMilestoneIndex}}
      .level-item.has-text-centered
        div
          p.heading Transactions
          p.title {{data.transactionsToRequest}}
      .level-item.has-text-centered
        div
          p.heading Tips
          p.title {{data.tips}}
      .level-item.has-text-centered  
        div
          p.heading Neighbors
          p.title {{data.neighbors}}
      .level-item.has-text-centered
        div
          p.heading Balance
          p.title {{balance | currency('')}} {{balance_unit}}
</template>

<script>
// import axios from 'axios'
import IOTA from 'iota.lib.js'
import config from '../config'
const iota = new IOTA({'provider': config.iota_node_url})
const addresses = [
  'SKOPVDKZQCQNOLPWWLLHTOIKVEIPRHYISRXXYSCKFAPBYXBWIXHHPCDFJOUOOPHVZJUFPGHIXNYMXNVBDZZSNDTPLW'
]

export default {
  name: 'iota-stats',
  data () {
    return {
      loading: false,
      data: {},
      balances: {},
      balance: '',
      balance_unit: 'i',
      is_synched: false
    }
  },
  methods: {
    getUnit: function (val) {
      if (val > 999999999999999) {
        return 'Pi'
      } else if (val > 999999999999) {
        return 'Ti'
      } else if (val > 999999999) {
        return 'Gi'
      } else if (val > 999999) {
        return 'Mi'
      } else if (val > 999) {
        return 'Ki'
      } else {
        return 'i'
      }
    },
    reloadData: function () {
      setInterval(() => {
        this.loadData()
      }, 30000)
    },
    loadData: function () {
      this.loading = true
      let vm = this

      iota.api.getNodeInfo(function (error, success) {
        if (error) {
          console.log(error)
        } else {
          vm.data = success
          vm.is_synched = (success.latestMilestoneIndex - success.latestSolidSubtangleMilestoneIndex) < 2
          vm.loading = false
        }
      })

      iota.api.getBalances(addresses, 100, function (error, success) {
        if (error) {
          console.error(error)
        } else {
          vm.balances = success
          vm.balance_unit = vm.getUnit(vm.balances.balances[0])
          vm.balance = iota.utils.convertUnits(vm.balances.balances[0], 'i', vm.balance_unit)
          vm.loading = false
        }
      })
    }
  },
  created: function () {
    this.loadData()
    this.reloadData()
  }

}
</script>

<style>
.content.stats {
  padding: 1.5rem;
}

nav.level {
  display: flex;
}

</style>

