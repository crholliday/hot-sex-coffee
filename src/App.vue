<template lang="pug">
  #app
    nav-header
    router-view
    footer.footer
      p &copy Some footer stuff here
</template>

<script>
  import navHeader from 'components/NavHeader'

export default {
    name: 'app',
    components: {
      navHeader
    }
}
</script>

<style>
  #app {padding-top: 20px}
</style>
