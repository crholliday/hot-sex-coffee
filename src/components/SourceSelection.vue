<template lang="pug">
div
  section.section.is-small
    label.label
      span Select a news source
    .select
      select( v-on:change='sourceChanged')
        option(value='') Select a news source ...
        option( v-for='source in sources' v-bind:value='source.id') {{source.name}}
    div.box(v-if='source')
      small Category: {{source.category}}
      h6 {{source.description}} 
      a(v-bind:href='source.url' class='button is-white' target='_blank')
        i(class='fa fa-external-link' aria-hidden='true') &nbsp;
        span Go To {{source.name}} Website
</template>

<script>
export default {
  name: 'sourceselection',
  data () {
    return {
      sources: [],
      source: ''
    }
  },
  methods: {
    sourceChanged: function (e) {
      for (var i = 0; i < this.sources.length; i++) {
        if (this.sources[i].id === e.target.value) {
          this.source = this.sources[i]
        }
      }
      this.$emit('sourceChanged', e.target.value)
    }
  },
  created: function () {
    this.$http.get('https://newsapi.org/v1/sources?language=en')
      .then(response => {
        this.sources = response.data.sources
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
