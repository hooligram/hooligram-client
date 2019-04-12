import PhoneNumber from 'awesome-phonenumber'

export default (countryCode, phoneNumber) => {
  const pn = new PhoneNumber(`+${countryCode}${phoneNumber}`)
  return pn.getNumber('international')
}
