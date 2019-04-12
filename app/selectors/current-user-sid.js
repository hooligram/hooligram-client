import { constructSid } from 'hg/utils'

export default state => {
  if (!state) return ''
  if (!state.authorization) return ''

  const countryCode = state.authorization.country_code
  const phoneNumber = state.authorization.phone_number
  return constructSid(countryCode, phoneNumber)
}
