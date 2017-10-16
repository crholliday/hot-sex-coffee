import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

var socket = new WebSocket('wss://api.bitfinex.com/ws/2')

socket.onerror = function (err) {
  console.log('Error from Bitfinex websocket: ', err)
}

let btcUsdMsg = ({
  event: 'subscribe',
  channel: 'trades',
  symbol: 'tBTCUSD'
})

let iotBtcMsg = ({
  event: 'subscribe',
  channel: 'trades',
  symbol: 'tIOTBTC'
})

let iotUsdMsg = ({
  event: 'subscribe',
  channel: 'trades',
  symbol: 'tIOTUSD'
})

socket.onopen = function (event) {
  console.log('Connected to Bitfinex websocket')
  store.dispatch('bitfinexWebSocketConnected', true)
  socket.send(JSON.stringify(btcUsdMsg))
  socket.send(JSON.stringify(iotBtcMsg))
  socket.send(JSON.stringify(iotUsdMsg))
}

socket.onmessage = function (event) {
  let data = JSON.parse(event.data)
  if (data.event === 'subscribed') {
    if (data.pair === 'BTCUSD') {
      store.dispatch('setBtcUsdChannel', data.chanId)
    } else if (data.pair === 'IOTBTC') {
      store.dispatch('setIotBtcChannel', data.chanId)
    } else if (data.pair === 'IOTUSD') {
      store.dispatch('setIotUsdChannel', data.chanId)
    }
  }

  if (data.length === 3 && data[1] !== 'hb') {
    store.dispatch('bitfinexTrade', data)
  }
}

socket.onclose = function (event) {
  console.log('Disconnected from Bitfinex websocket ...')
  store.dispatch('bitfinexWebSocketConnected', false)
  setTimeout(function () {
    socket.connect()
  }, 5000)
}

const state = {
  isLoggedIn: localStorage.getItem('token'),
  loggedInUser: localStorage.getItem('loggedInUser'),
  distinctRoutes: [],
  cheapFlights: [],
  airlines: [],
  cheapFlightsByDay: [],
  todos: [],
  cryptos: [],
  cryptoTotal: 0,
  iotaTransaction: {},
  iotaSocketConnected: false,
  iotaSocketError: false,
  bitfinexTrade: {},
  bitfinexWebSocketConnected: false,
  bitfinexWebSocketError: {},
  iotBtcChannel: '',
  iotUsdChannel: '',
  btcUsdChannel: '',
  btcUsdTradeValue: 0,
  iotUsdTradeValue: 0,
  iotBtcTradeValue: 0,
  reconnectLimit: 20,
  attemptedReconnects: 0
}

// eslint-disable-next-line
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
