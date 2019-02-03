export const SEND_MESSAGE = 'SEND_MESSAGE'
export const VERIFICATION_REQUEST_CODE_REQUEST = 'VERIFICATION_REQUEST_CODE_REQUEST'
export const VERIFICATION_REQUEST_CODE_SUCCESS = 'VERIFICATION_REQUEST_CODE_SUCCESS'
export const VERIFICATION_REQUEST_CODE_FAILURE = 'VERIFICATION_REQUEST_CODE_FAILURE'

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
