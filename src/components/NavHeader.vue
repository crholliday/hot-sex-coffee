<template lang="pug">
.container
    nav.nav.has-shadow
        .container
            .nav-left
                a.nav-item
                    i.fa.fa-fire.is-red(style="font-size: 28px; color: red;") &nbsp; Hot Sex Coffee
            .nav-center
                a.nav-item(href="https://github.com/crholliday")
                    .icon
                        i.fa.fa-github
                a.nav-item
                    .icon
                        i.fa.fa-twitter

            <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
            <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
            span.nav-toggle(@click="isActive = !isActive")
                span
                span
                span

            <!-- This "nav-menu" is hidden on mobile -->
            <!-- Add the modifier "is-active" to display it on mobile -->
            .nav-right.nav-menu(:class="{ 'is-active': isActive }")
                router-link.nav-item.is-tab(to="/")
                    i.fa.fa-home(style="font-size: 16px") &nbsp;
                    span Home
                router-link.nav-item.is-tab(to="/news") 
                    i.fa.fa-file-text-o(style="font-size: 16px") &nbsp;
                    span News
                router-link.nav-item.is-tab(to="/todos") 
                    i.fa.fa-tasks(style="font-size: 16px") &nbsp;
                    span Todos
                router-link.nav-item.is-tab(to="/flights")
                    i.fa.fa-plane(style="font-size: 16px") &nbsp;
                    span Flights
                .nav-item
                  .field.is-grouped(v-if="!isLoggedIn")
                    p.control
                        router-link.button(to="/login")
                            span Login
                  .fieldis-grouped(v-else)
                    p.control
                        .button.is-primary(@click="logoutUser")
                            span Logout
    section.hero.is-dark.is-bold
        .hero-body
            .container.is-fluid
                h1.title
                    i.fa.fa-list(style='font-size: 36px')           
                    span &nbsp; {{$route.meta.titleText}}         
                h2.subtitle {{$route.meta.subtitleText}}
</template>

<script>
 
import {mapState, mapActions} from 'vuex'

export default {
   name: 'nav-header',
   data () {
     return {
       isActive: false
     }
   },
   methods: {
     ...mapActions(['logout']),
     logoutUser: function () {
       this.logout()
     }
   },
   computed:
     mapState(['isLoggedIn'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
