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
  },
  [types.SOCKET_CONNECT] (state) {
    state.iotaSocketConnected = true
  },
  [types.SOCKET_TX] (state, msg) {
    state.iotaTransaction = msg
  },
  [types.BITFINEX_TRADE] (state, msg) {
    state.bitfinexTrade = msg
    if (msg[0] === state.btcUsdChannel) {
      state.btcUsdTradeValue = msg[2][3]
    } else if (msg[0] === state.iotUsdChannel) {
      state.iotUsdTradeValue = msg[2][3]
    } else if (msg[0] === state.iotBtcChannel) {
      state.iotBtcTradeValue = msg[2][3]
    }
  },
  [types.BITFINEX_WEBSOCKET_CONNECTED] (state, msg) {
    state.bitfinexWebSocketConnected = msg
  },
  [types.BITFINEX_WEBSOCKET_ERROR] (state, msg) {
    state.bitfinexWebSocketError = msg
  },
  [types.SET_BTC_USD_CHANNEL] (state, msg) {
    state.btcUsdChannel = msg
  },
  [types.SET_IOTA_USD_CHANNEL] (state, msg) {
    state.iotUsdChannel = msg
  },
  [types.SET_IOTA_BTC_CHANNEL] (state, msg) {
    state.iotBtcChannel = msg
  }
}

export default mutations
