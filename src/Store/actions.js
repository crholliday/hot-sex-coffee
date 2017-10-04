import * as types from './mutation-types'
import axios from 'axios'
import router from '../router'

const config = require('../config')

const actions = {
  login ({state, commit, rootState}, creds) {
    commit(types.LOGIN) // show spinner
    axios.post(config.api_base_url + '/login', creds)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user))
        commit(types.ASSIGN_LOGGED_IN_USER, response.data.user)
        commit(types.LOGIN_SUCCESS)
        router.push('/')
      })
  },
  logout ({commit}) {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    commit(types.REMOVE_LOGGED_IN_USER)
    commit(types.LOGOUT)
    router.push('/login')
  },
  loadRoutes ({state, commit}) {
    axios.get(config.api_base_url + '/distinct_routes')
      .then(response => {
        commit(types.LOAD_DISTINCT_ROUTES, response.data)
      })
  },
  loadCheapFlights ({state, commit}) {
    axios.get(config.api_base_url + '/cheap-flights')
      .then(response => {
        commit(types.LOAD_CHEAP_FLIGHTS, response.data)
      })
  },
  loadAirlines ({state, commit}) {
    axios.get(config.api_base_url + '/airlines')
      .then(response => {
        commit(types.LOAD_AIRLINES, response.data)
      })
  },
  loadCheapFlightsByDay ({state, commit}) {
    axios.get(config.api_base_url + '/cheap-flights-by-day')
      .then(response => {
        commit(types.LOAD_CHEAP_FLIGHTS_BY_DAY, response.data)
      })
  },
  loadTodos ({state, commit}) {
    axios.get(config.api_base_url + '/todos')
      .then(response => {
        commit(types.LOAD_TODOS, response.data)
      })
  },
  addTodo ({state, commit}, todo) {
    axios.get(config.api_base_url + '/todos')
      .then(response => {
        commit(types.LOAD_TODOS, response.data)
      })
  },
  deleteTodo ({state, commit}, todo) {
    axios.delete(config.api_base_url + '/todo/' + todo._id)
      .then(response => {
        commit(types.DELETE_TODO, todo)
      })
  },
  loadUser ({state, commit}, user) {
    commit(types.ASSIGN_LOGGED_IN_USER, user)
  },
  upsertCrypto ({state, commit}, crypto) {
    // crypto = {channelID: 123, amount: 234.56}
    commit(types.CRYPTO_UPSERT, crypto)
    commit(types.CRYPTO_GET_TOTAL)
  },
  socket_tx ({state, commit}, msg) {
    commit(types.SOCKET_TX, msg)
  },
  bitfinexTrade ({state, commit}, msg) {
    commit(types.BITFINEX_TRADE, msg)
  },
  bitfinexWebSocketConnected ({state, commit}, msg) {
    commit(types.BITFINEX_WEBSOCKET_CONNECTED, msg)
  },
  bitfinexWebSocketErro ({state, commit}, msg) {
    commit(types.BITFINEX_WEBSOCKET_ERROR, msg)
  },
  setBtcUsdChannel ({state, commit}, msg) {
    commit(types.SET_BTC_USD_CHANNEL, msg)
  },
  setIotUsdChannel ({state, commit}, msg) {
    commit(types.SET_IOTA_USD_CHANNEL, msg)
  },
  setIotBtcChannel ({state, commit}, msg) {
    commit(types.SET_IOTA_BTC_CHANNEL, msg)
  }
}

export default actions
