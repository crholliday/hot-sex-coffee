<template lang="pug">
span
  .button.is-pulled-right.is-outlined.is-success.is-small.is-static(v-if='connected') 
    .icon.is-small 
      .i.fa.fa-cog.fa-spin 
    span Connected
  .button.is-pulled-right.is-outlined.is-danger.is-small.is-static(v-else) 
    .icon.is-small 
      .i.fa.fa-cog
    span Disconnected
</template>

<script>

export default {
  name: 'connected-button',
  data () {
    return {
    }
  },
  props: {
    connected: Boolean
  }
}
</script>

<style scoped>
</style>

