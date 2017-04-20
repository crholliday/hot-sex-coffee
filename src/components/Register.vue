<template lang="pug">
.container.register
    .columns
        .column.column.is-6.is-offset-3
            h1.title Register an Account
            .box
                label.label Full Name
                p.control
                    input.input(type="text" 
                      v-bind:class="{'is-danger': errors.has('fullName') }" 
                      v-validate="'required'" 
                      placeholder="Full Name" 
                      v-model="fullName" 
                      name="fullName")
                    span.help.is-danger(v-show="errors.has('fullName')") {{ errors.first('fullName') }}
                label.label Username
                p.control
                    input.input(type="text" 
                      v-validate="'required'" 
                      v-bind:class="{'is-danger': errors.has('username') }"
                      placeholder="username" 
                      v-model="username" 
                      name="username")
                    span.help.is-danger(v-show="errors.has('username')") {{ errors.first('username') }}
                label.label Email
                p.control
                    input.input(type="email" 
                      v-validate="'required|email'" 
                      v-bind:class="{'is-danger': errors.has('email') }"
                      placeholder="email@domain.com" 
                      v-model="email" 
                      name="email")
                    span.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}
                hr
                label.label Password
                p.control
                    input.input(type="password" 
                      v-validate="'required|confirmed:confirmPassword'" 
                      v-bind:class="{'is-danger': errors.has('password') }"
                      placeholder="******" 
                      v-model="password" 
                      name="password")
                    span.help.is-danger(v-show="errors.has('password')") {{ errors.first('password') }}
                label.label Confirm Password
                p.control
                    input.input(type="password" 
                      v-validate="'required'" 
                      placeholder="******" 
                      v-model="confirmPassword" 
                      name="confirmPassword")
                    span.help.is-danger(v-show="errors.has('confirmPassword')") {{ errors.first('confirmPassword') }}
                hr
                p.control
                    button.button.is-primary(@click='validateBeforeSubmit') Register 
                    | 
                    button.button.is-default(@click='reset') Cancel
            p.has-text-centered
                router-link(to="/login") Login |
                router-link(to="#")  Need help?
</template>

<script>

const config = require('../config')

export default {
  name: 'register',
  components: {
  },
  data () {
    return {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    reset: function () {
      this.fullName = ''
      this.username = ''
      this.email = ''
      this.password = ''
    },
    validateBeforeSubmit: function () {
      this.$validator.validateAll().then(() => {
        let user = {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          password: this.password
        }
        this.$http.post(config.api_base_url + '/register', user)
              .then(response => {
                this.$router.push('/')
              })
      }).catch(() => {
        alert('Correct the errors!')
      })
    }
  }
}
</script>

<style>
 .container.register {
    padding-top: 20px
  }
</style>
