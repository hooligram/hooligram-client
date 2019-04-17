export default state => {
  if (!state) return ''
  if (!state.authorization) return ''

  return state.authorization.verification_code
}
