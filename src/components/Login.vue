<template lang="pug">
.container.register
    .columns
        .column.is-6.is-offset-3
            h1.title Login
            .box
                label.label Username
                p.control
                    input.input(type="text" 
                      v-validate="'required'" 
                      v-bind:class="{'is-danger': errors.has('username') }"
                      placeholder="username" 
                      v-model="username" 
                      name="username")
                    span.help.is-danger(v-show="errors.has('username')") {{ errors.first('username') }}
                label.label Password
                p.control
                    input.input(type="password" 
                      v-validate="'required'" 
                      v-bind:class="{'is-danger': errors.has('password') }"
                      placeholder="******" 
                      v-model="password" 
                      name="password")
                    span.help.is-danger(v-show="errors.has('password')") {{ errors.first('password') }}
                hr
                p.control
                    button.button.is-primary(@click="validateBeforeSubmit") Login
                    |  
                    button.button.is-default(@click="reset") Cancel
            p.has-text-centered
                router-link(to="/register") Register? 
                | |
                router-link(to="#")  Need help?
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    reset: function () {
      this.username = ''
      this.password = ''
    },
    validateBeforeSubmit: function () {
      this.$validator.validateAll().then(() => {
        let user = {
          username: this.username,
          password: this.password
        }
        this.login(user)
      }).catch((err) => {
        alert('Correct the errors!' + err)
      })
    }
  }
}
</script>

<style>
  #app {
    padding-top: 20px
  }
</style>
