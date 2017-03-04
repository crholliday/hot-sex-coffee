<template lang="pug">
  .container This is the Todos page
</template>

<script>

export default {
  name: 'todos',
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
