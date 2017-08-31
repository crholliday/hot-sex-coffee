import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isLoggedIn: localStorage.getItem('token'),
  loggedInUser: localStorage.getItem('loggedInUser'),
  distinctRoutes: [],
  cheapFlights: [],
  airlines: [],
  cheapFlightsByDay: [],
  todos: [],
  socket: {
    isConnected: false,
    message: ''
  },
  cryptos: [],
  cryptoTotal: 0
}

// eslint-disable-next-line
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
