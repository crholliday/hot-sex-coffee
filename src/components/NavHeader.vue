<template lang="pug">
.container
    nav.nav.has-shadow
        .container
            .nav-left
                a.nav-item
                    i.fa.fa-fire.is-red(style="font-size: 28px; color: red;") &nbsp; Hot Sex Coffee
            .nav-center
                a.nav-item
                    .icon
                        i.fa.fa-github
                a.nav-item
                    .icon
                        i.fa.fa-twitter

            <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
            <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
            span.nav-toggle
                span
                span
                span

            <!-- This "nav-menu" is hidden on mobile -->
            <!-- Add the modifier "is-active" to display it on mobile -->
            .nav-right.nav-menu
                a.nav-item.is-tab
                    i.fa.fa-home(style="font-size: 16px") &nbsp;
                    span Home
                a.nav-item.is-tab 
                    i.fa.fa-file-text-o(style="font-size: 16px") &nbsp;
                    span News
                a.nav-item.is-tab
                    i.fa.fa-plane(style="font-size: 16px") &nbsp;
                    span Flights
    section.hero.is-dark.is-bold
        .hero-body
            .container.is-fluid
                h1.title
                    i.fa.fa-list(style='font-size: 36px')           
                    span &nbsp; News List          
                h2.subtitle News from everywhere... 
</template>

<script>

export default {
  name: 'nav-header',
  data () {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
