export default {
  isAuthorized: (state) => (
    !!state.authorization.token &&
    !!state.authorization.token.code &&
    !!state.authorization.token.country_code &&
    !!state.authorization.token.phone_number
  ),
  currentUserCountryCode: (state) => (
    state.profile.codeRequest.country_code !== ''
      ? state.profile.codeRequest.country_code
      : undefined
  ),
  currentUserPhoneNumber: (state) => (
    state.profile.codeRequest.phone_number !== ''
      ? state.profile.codeRequest.phone_number
      : undefined
  )
}