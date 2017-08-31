const getters = {
  isLoggedIn: state => state.isLoggedIn,
  loggedInUser: state => state.loggedInUser,
  distinctRoutes: state => state.distinctRoutes,
  cheapFlights: state => state.cheapFlights,
  cheapFlightsByDay: state => state.cheapFlightsByDay,
  airlines: state => state.airlines,
  todos: state => state.todos,
  cryptos: state => state.cryptos,
  cryptoTotal: state => state.cryptoTotal
}

export default getters
