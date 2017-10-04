const getters = {
  isLoggedIn: state => state.isLoggedIn,
  loggedInUser: state => state.loggedInUser,
  distinctRoutes: state => state.distinctRoutes,
  cheapFlights: state => state.cheapFlights,
  cheapFlightsByDay: state => state.cheapFlightsByDay,
  airlines: state => state.airlines,
  todos: state => state.todos,
  cryptos: state => state.cryptos,
  cryptoTotal: state => state.cryptoTotal,
  iotaSocketConnected: state => state.iotaSocketConnected,
  iotaTransaction: state => state.iotaTransaction,
  bitfinexTrade: state => state.bitfinexTrade,
  bitfinexTradeByChannel: (state, getters) => (channelId) => {
    return state.tickerTrade.filter(trade => trade[0] === channelId)
  },
  bitfinexWebSocketConnected: state => state.bitfinexWebSocketConnected,
  bitfinexWebSocketError: state => state.bitfinexWebSocketError,
  getBtcUsdChannel: state => state.btcUsdChannel,
  getIotUsdChannel: state => state.iotUsdChannel,
  getIotBtcChannel: state => state.iotBtcChannel
}

export default getters
