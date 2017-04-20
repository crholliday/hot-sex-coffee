import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

const config = require('../config')

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

// eslint-disable-next-line
const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    profile: {}
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({state, commit, rootState}, creds) {
      commit(LOGIN) // show spinner
      axios.post(config.api_base_url + '/login', creds)
        .then(response => {
          console.log('response from API...', response)
          localStorage.setItem('token', response.data.token)
          commit(LOGIN_SUCCESS)
        })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})

export default store
