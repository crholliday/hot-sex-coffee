<template lang="pug">

.section.news-list
  .container
    article.media(v-for='article in articles')
      figure.media-left
        p.image.is-128x128
          a(v-bind:href='article.url' target='_blank')
            img(v-bind:src='article.urlToImage')
      .media-content
        .content
          h4 
            a(v-bind:href='article.url' target='_blank') {{article.title}}
          h6.byline 
            i by {{article.author}} {{ formattedDate(article)}}
          p {{article.description}}

</template>

<script>
import Moment from 'moment'

export default {
  name: 'newslist',
  props: ['source'],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    updateSource: function (source) {
      if (source !== '') {
        this.$http.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=3a5bfd83b8b04a7199e7e23386e9bff7')
        .then(response => {
          this.articles = response.data.articles
        })
      }
    },
    formattedDate: function (article) {
      return Moment(article.publishedAt).fromNow()
    }
  },
  created: function () {
    this.updateSource(this.source)
  },
  watch: {
    source: function (val) {
      this.updateSource(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content h4 {margin-bottom: 0.5em;}
  .byline {color: lightgray;}
  .news-list {margin-top: 0px; padding-top: 0rem;}
</style>
