import * as types from './mutation-types'

const mutations = {
  [types.LOGIN] (state) {
    state.pending = true
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false
  },
  [types.ASSIGN_LOGGED_IN_USER] (state, user) {
    state.loggedInUser = user
  },
  [types.REMOVE_LOGGED_IN_USER] (state, user) {
    state.loggedInUser = {}
  },
  [types.LOAD_DISTINCT_ROUTES] (state, routes) {
    state.distinctRoutes = routes
  },
  [types.LOAD_CHEAP_FLIGHTS] (state, flights) {
    state.cheapFlights = flights
  },
  [types.LOAD_AIRLINES] (state, airlines) {
    state.airlines = airlines
  },
  [types.LOAD_CHEAP_FLIGHTS_BY_DAY] (state, flights) {
    state.cheapFlightsByDay = flights
  },
  [types.LOAD_TODOS] (state, todos) {
    state.todos = todos
  },
  [types.DELETE_TODO] (state, todo) {
    let todos = state.todos
    todos.splice(todos.indexOf(todo), 1)
  },
  [types.CRYPTO_UPSERT] (state, crypto) {
    var index = state.cryptos.findIndex(i => i.currency === crypto.currency)

    if (index !== -1) {
      state.cryptos[index].amount = crypto.amount
    } else {
      state.cryptos.splice(state.cryptos.length, 0, crypto)
    }
  },
  [types.CRYPTO_GET_TOTAL] (state) {
    var total = state.cryptos.reduce(function (a, b) { return a + +b.amount }, 0)
    state.cryptoTotal = total
  }
}

export default mutations
