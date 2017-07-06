<template lang="pug">
  peity( v-bind:type='"line"' 
        v-bind:options='{width: 90, fill: false, min: Math.min.apply(trend), max: Math.max.apply(trend)}' 
        v-bind:data='trend')
  
</template>


<script>
import Peity from 'vue-peity'
import Config from '../config'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'kpi-spark',
  components: {Peity},
  data () {
    return {
      loading: false,
      trend: '5.33, 4.21, 3.09, 3.67, 3.56, 4.06'
    }
  },
  props: {
    trendTicker: {type: String, required: true}
  },
  methods: {
    loadData: function () {
      this.loading = true
      let params = {
        api_key: Config.quandl_api_key,
        start_date: moment().subtract(1, 'months')
      }

      let reqConfig = {
        url: 'https://www.quandl.com/api/v3/datasets/' + this.trendTicker + '.json',
        params: params
      }

      axios.request(reqConfig)
        .then(response => {
          this.trend = response.data.dataset.data.reverse().map(data => { return data[1] }).toString()
          this.loading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created: function () {
    this.loadData()
  }

}
</script>

<style>
.content.kpi {
  align-content: center;
  text-align: center;
}

</style>

