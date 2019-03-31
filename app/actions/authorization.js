import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '.'

export const authorizationSignInRequest = (code, country_code, phone_number) => {
  return {
    type: AUTHORIZATION_SIGN_IN_REQUEST,
    payload: {
      code,
      country_code,
      phone_number
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
