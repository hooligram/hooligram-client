export const VERIFICATION_REQUEST_CODE_REQUEST = 'API:VERIFICATION_REQUEST_CODE_REQUEST'
export const VERIFICATION_REQUEST_CODE_SUCCESS = 'API:VERIFICATION_REQUEST_CODE_SUCCESS'
export const VERIFICATION_REQUEST_CODE_FAILURE = 'API:VERIFICATION_REQUEST_CODE_FAILURE'

export const VERIFICATION_SUBMIT_CODE_REQUEST = 'API:VERIFICATION_SUBMIT_CODE_REQUEST'
export const VERIFICATION_SUBMIT_CODE_SUCCESS = 'API:VERIFICATION_SUBMIT_CODE_SUCCESS'
export const VERIFICATION_SUBMIT_CODE_FAILURE = 'API:VERIFICATION_SUBMIT_CODE_FAILURE'

export const requestVerificationCode = (countryCode, phoneNumber) => {
  return {
    type: VERIFICATION_REQUEST_CODE_REQUEST,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    }
  }
}

export const submitVerificationCode = (code) => {
  return {
    type: VERIFICATION_SUBMIT_CODE_REQUEST,
    payload: {
      code
    }
  }
}
