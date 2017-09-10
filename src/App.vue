<template lang="pug">
  #app
    nav-header
    router-view
    footer.footer
      p &copy Hot Sex Coffee - A happy and energetic place
      p.env: small {{ env | capitalize }}        
</template>

<script>
  import navHeader from 'components/NavHeader'
  import config from 'config'

export default {
    name: 'app',
    components: {
      navHeader
    },
    computed: {
      env: function () {
        return config.env
      }
    }
}
</script>

<style>
  #app {padding-top: 20px}
  .env {color:darkgrey}
</style>
