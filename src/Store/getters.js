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
  iotaTransactions: state => state.iotaTransactions,
  bitfinexTrade: state => state.bitfinexTrade,
  getBtcUsdTradeValue: state => state.btcUsdTradeValue,
  getIotUsdTradeValue: state => state.iotUsdTradeValue,
  getIotBtcTradeValue: state => state.iotBtcTradeValue,
  bitfinexWebSocketConnected: state => state.bitfinexWebSocketConnected,
  bitfinexWebSocketError: state => state.bitfinexWebSocketError,
  getBtcUsdChannel: state => state.btcUsdChannel,
  getIotUsdChannel: state => state.iotUsdChannel,
  getIotBtcChannel: state => state.iotBtcChannel
}

export default getters
