<template lang="pug">
  .container This is the flights page
</template>

<script>

export default {
  name: 'flights',
  components: {

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

</style>
