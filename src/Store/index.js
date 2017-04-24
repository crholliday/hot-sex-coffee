import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from '../router'

const config = require('../config')

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ASSIGN_LOGGED_IN_USER = 'ASSIGN_LOGGED_IN_USER'
const REMOVE_LOGGED_IN_USER = 'REMOVE_LOGGED_IN_USER'
const LOAD_DISTINCT_ROUTES = 'LOAD_DISTINCT_ROUTES'
const LOAD_CHEAP_FLIGHTS = 'LOAD_CHEAP_FLIGHTS'
const LOAD_AIRLINES = 'LOAD_AIRLINES'
const LOAD_CHEAP_FLIGHTS_BY_DAY = 'LOAD_CHEAP_FLIGHTS_BY_DAY'

// eslint-disable-next-line
const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    loggedInUser: {},
    distinctRoutes: [],
    cheapFlights: [],
    airlines: [],
    cheapFlightsByDay: []
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
    },
    [ASSIGN_LOGGED_IN_USER] (state, user) {
      state.loggedInUser = user
    },
    [REMOVE_LOGGED_IN_USER] (state, user) {
      state.loggedInUser = {}
    },
    [LOAD_DISTINCT_ROUTES] (state, routes) {
      state.distinctRoutes = routes
    },
    [LOAD_CHEAP_FLIGHTS] (state, flights) {
      state.cheapFlights = flights
    },
    [LOAD_AIRLINES] (state, airlines) {
      state.airlines = airlines
    },
    [LOAD_CHEAP_FLIGHTS_BY_DAY] (state, flights) {
      state.cheapFlightsByDay = flights
    }
  },
  actions: {
    login ({state, commit, rootState}, creds) {
      commit(LOGIN) // show spinner
      axios.post(config.api_base_url + '/login', creds)
        .then(response => {
          localStorage.setItem('token', response.data.token)
          commit(ASSIGN_LOGGED_IN_USER, response.data.user)
          commit(LOGIN_SUCCESS)
          router.push('/')
        })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit(REMOVE_LOGGED_IN_USER)
      commit(LOGOUT)
      router.push('/login')
    },
    loadRoutes ({state, commit}) {
      axios.get(config.api_base_url + '/distinct_routes')
        .then(response => {
          commit(LOAD_DISTINCT_ROUTES, response.data)
        })
    },
    loadCheapFlights ({state, commit}) {
      axios.get(config.api_base_url + '/cheap-flights')
        .then(response => {
          commit(LOAD_CHEAP_FLIGHTS, response.data)
        })
    },
    loadAirlines ({state, commit}) {
      axios.get(config.api_base_url + '/airlines')
        .then(response => {
          commit(LOAD_AIRLINES, response.data)
        })
    },
    loadCheapFlightsByDay ({state, commit}) {
      axios.get(config.api_base_url + '/cheap-flights-by-day')
        .then(response => {
          commit(LOAD_CHEAP_FLIGHTS_BY_DAY, response.data)
        })
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    loggedInUser: state => {
      return state.loggedInUser
    },
    distinctRoutes: state => {
      return state.distinctRoutes
    },
    cheapFlights: state => {
      return state.cheapFlights
    },
    airlines: state => {
      return state.airlines
    },
    cheapFlightsByDay: state => {
      return state.cheapFlightsByDay
    }
  }
})

export default store
