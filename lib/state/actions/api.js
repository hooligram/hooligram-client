export const SEND_MESSAGE = 'SEND_MESSAGE'
export const VERIFICATION_REQUEST_CODE_REQUEST = 'API:VERIFICATION_REQUEST_CODE_REQUEST'

export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: {
      message
    }
  }
}

export const requestVerificationCode = (countryCode, phoneNumber) => {
  return {
    type: VERIFICATION_REQUEST_CODE_REQUEST,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    }
  }
}
