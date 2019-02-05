export const SEND_MESSAGE = 'SEND_MESSAGE'

export const API_INIT_REQUEST = 'API_INIT_REQUEST'
export const API_INIT_SUCCESS = 'API_INIT_SUCCESS'
export const API_ERROR = 'API_ERROR'
export const API_CLOSE = 'API_CLOSE'

export const VERIFICATION_REQUEST_CODE_REQUEST = 'API:VERIFICATION_REQUEST_CODE_REQUEST'
export const VERIFICATION_REQUEST_CODE_SUCCESS = 'VERIFICATION_REQUEST_CODE_SUCCESS'
export const VERIFICATION_REQUEST_CODE_FAILURE = 'VERIFICATION_REQUEST_CODE_FAILURE'

export const VERIFICATION_SUBMIT_CODE_REQUEST = 'API:VERIFICATION_SUBMIT_CODE_REQUEST'
export const VERIFICATION_SUBMIT_CODE_SUCCESS = 'VERIFICATION_SUBMIT_CODE_SUCCESS'
export const VERIFICATION_SUBMIT_CODE_FAILURE = 'VERIFICATION_SUBMIT_CODE_FAILURE'

export const apiInit = () => {
  return {
    type: API_INIT_REQUEST,
    payload: {}
  }
}

export const apiInitSuccess = () => {
  return {
    type: API_INIT_SUCCESS,
    payload: {}
  }
}

export const apiClose = (reason, code) => {
  return {
    type: API_CLOSE,
    payload: {
      reason,
      code
    }
  }
}

export const apiError = (err) => {
  return {
    type: API_ERROR,
    payload: {
      err
    }
  }
}

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

export const submitVerificationCode = (code) => {
  return {
    type: VERIFICATION_SUBMIT_CODE_REQUEST,
    payload: {
      code
    }
  }
}
