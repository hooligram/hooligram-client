export default {
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

export { default as currentUserCountryCode } from './current-user-country-code'
export { default as currentUserPhoneNumber } from './current-user-phone-number'
export { default as currentUserVerificationCode } from './current-user-verification-code'
export { default as isWebsocketOnline } from './is-websocket-online'
