<template lang="pug">
.column.is-one-quarter
  .box.kpi
    article.media
      div(v-if='loading')
        i.fa.fa-spinner.fa-spin.fa-3x.fa-fw
        .sr-only Loading...
      .media-content(v-else)
        .content.kpi
          h1.title.h1 {{amount | currency}}
          h6.subtitle.h6.gray {{label | truncate(30)}}
          kpi-spark(v-bind:trendTicker='trendTicker')
          p: small Last updated: {{latest_date | formatTime}}  
            a.button.is-link.is-small(v-on:click='loadData')
              span.icon.is-small
                i.fa.fa-refresh(aria-hidden='true')
  
</template>

<script>
import Peity from 'vue-peity'
import KpiSpark from '../components/KpiSpark.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'kpi-tile',
  components: {Peity, KpiSpark},
  data () {
    return {
      loading: false,
      label: 'Pork Belly',
      amount: '9.56',
      latest_date: '',
      data: {}
    }
  },
  props: {
    ticker: {type: String, required: true},
    trendTicker: {type: String, required: true},
    title: {type: String}
  },
  methods: {
    loadData: function () {
      this.loading = true

      // Yahoo query language
      let url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20("' + this.ticker + '")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'

      axios.request(url)
        .then(response => {
          this.data = response.data
          this.label = this.title ? this.title : response.data.query.results.quote.Name
          this.amount = response.data.query.results.quote.LastTradePriceOnly.toString()
          this.latest_date = moment(Date.now())
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

