<template lang="pug">
.column.is-one-quarter
  .box
    article.media
      div(v-if='loading')
        i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
        .sr-only Loading...
      .media-content(v-else)
        .content.kpi
          h1.title.h1 {{amount | currency}}
          h6.subtitle.h6.gray {{label | truncate(30)}}
          peity( v-bind:type='"line"' 
                v-bind:options='{width: 90, fill: false, min: Math.min.apply(trend), max: Math.max.apply(trend)}' 
                v-bind:data='trend')
          p: small Last updated: {{latest_date | formatDateHuman}}
  
</template>


<script>
import Peity from 'vue-peity'
import Config from '../config'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'kpi-tile',
  components: {Peity},
  data () {
    return {
      loading: false,
      label: 'Pork Belly',
      amount: '9.56',
      latest_date: '',
      trend: '5.33, 4.21, 3.09, 3.67, 3.56, 4.06'
    }
  },
  props: {
    dataset: {type: String, required: true},
    title: {type: String}
  },
  methods: {
    loadData: function () {
      this.loading = true
      let params = {
        api_key: Config.quandl_api_key,
        start_date: moment().subtract(1, 'months')
      }

      let reqConfig = {
        url: 'https://www.quandl.com/api/v3/datasets/' + this.dataset + '.json',
        params: params
      }

      axios.request(reqConfig)
        .then(response => {
          this.label = this.title ? this.title : response.data.dataset.name
          this.amount = response.data.dataset.data[0][1].toString()
          this.trend = response.data.dataset.data.map(data => { return data[1] }).toString()
          this.latest_date = response.data.dataset.newest_available_date
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

