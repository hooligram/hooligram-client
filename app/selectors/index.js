export default {
  isAuthorized: (state) => (
    !!state.authorization.token &&
    !!state.authorization.country_code &&
    !!state.authorization.phone_number
  ),
  currentUserCountryCode: (state) => (
    state.authorization.country_code !== ''
      ? state.authorization.country_code
      : undefined
  ),
  currentUserPhoneNumber: (state) => (
    state.authorization.phone_number !== ''
      ? state.authorization.phone_number
      : undefined
  ),
  currentUserCode: (state) => (
    state.authorization.token !== ''
      ? state.authorization.token
      : undefined
  ),
  messages: (state) => (
    state.messages.allIds
      .map(id => state.messages.byId[id])
  )
}

export { default as isWebsocketOnline } from './app-is-websocket-online'
