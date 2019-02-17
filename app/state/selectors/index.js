export default {
  isAuthorized: (state) => (
    !!state.authorization.token &&
    !!state.authorization.token.code &&
    !!state.authorization.token.country_code &&
    !!state.authorization.token.phone_number
  )
}