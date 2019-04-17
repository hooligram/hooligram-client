import PhoneNumber from 'awesome-phonenumber'
import emojiFlags from 'emoji-flags'

export default (sid) => {
  try {
    const split = sid.split('.')
    const countryCode = split[0]
    const phoneNumber = split[1]

    if (!countryCode || !phoneNumber) return '🇳🇵'

    const pn = new PhoneNumber(`+${countryCode}${phoneNumber}`)
    const regionCode = pn.getRegionCode()
    return emojiFlags.countryCode(regionCode).emoji
  }
  catch {
    return '🇳🇵'
  }
}
