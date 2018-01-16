<template lang="pug">
a.box.iotaCard(v-bind:href="url + msg.hash" target="_blank")
  .article.media          
    .media-left.values.has-text-centered
      .title.is-size-5.has-text-grey {{getFormattedValue(msg.amount)}}
      p
      .small.is-size-7.has-text-grey-light    {{ getDate(msg.timestamp) | formatDateHuman | capitalize}}
      .small.is-size-7.has-text-grey-light    {{ getDate(msg.timestamp) | formatTime | capitalize}}
    .media-content 
      .content 
        .small.is-size-7  {{msg.hash | truncate(40)}} <br />
        .tag(v-bind:class="tagClass") {{msg.tag}}  
      .level
        .level-item.has-text-centered
          .heading.has-text-grey USD
            .small {{usd_amount(msg.amount) | currency}}
        .level-item.has-text-centered
          .heading.has-text-grey BTC
            .small {{btc_amount(msg.amount) | currency('', 4)}}
        .level-item.has-text-centered
          .heading.has-text-grey Index
            .small {{msg.currentIndex}}/{{msg.lastIndex}}
</template>

<script>
import moment from 'moment'
import utils from '../utils/iota-utils'

export default {
  name: 'iota-card',
  data () {
    return {
      loading: false,
      unit: 'i',
      url: 'https://thetangle.org/transaction/'
    }
  },
  props: {
    msg: {type: Object, required: true},
    iotUsdTradeValue: {type: Number, required: true},
    iotBtcTradeValue: {type: Number, required: true}
  },
  computed: {
    tagClass: function () {
      if (this.msg.tag === '999999999999999999999999999') {
        return 'is-light'
      } else {
        return 'is-info'
      }
    }
  },
  methods: {
    getUnit: function (input) {
      let val = Math.abs(input)
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
    getFormattedValue: function (val) {
      let valUnit = this.getUnit(val)
      let num = Number(val)
      let newVal = utils.convertUnits(num, 'i', valUnit).toFixed(2)
      return newVal + ' ' + valUnit
    },
    getDate: function (dateString) {
      return moment.unix(dateString)
    },
    usd_amount: function (amount) {
      return (amount / 1000000) * this.iotUsdTradeValue
    },
    btc_amount: function (amount) {
      return (amount / 1000000) * this.iotBtcTradeValue
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.box.iotaCard {
  padding: 5px;
  margin: 5px;
}
.media-left.values {
  padding: 0 5px 0 5px;
  border-right: 1px dashed lightgray;
  width: 7rem;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: text-shadow .5s ease-in-out;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /*opacity: 0;*/
  text-shadow: 0 0 3px lightgreen;
}

/* The slow way */
.bloom{
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Transition to a bigger shadow on hover */
.bloom:hover {
  box-shadow: 0 5px 16px rgba(0,0,0,0.3);
}

.load {
  z-index: 1000
}

</style>

