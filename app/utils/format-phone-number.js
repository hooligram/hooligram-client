export default (countryCode, phoneNumber) => {
  const areaCode = phoneNumber.slice(0, 3)
  const phonePartOne = phoneNumber.slice(3, 6)
  const phonePartTwo = phoneNumber.slice(6, 10)
  return `+${countryCode}`
    .concat(` (${areaCode})`)
    .concat(` ${phonePartOne}-${phonePartTwo}`)
}
