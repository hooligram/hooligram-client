import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '.'

export const authorizationSignInRequest = (countryCode, phoneNumber, verificationCode) => {
  return {
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber,
      verification_code: verificationCode
    },
    type: AUTHORIZATION_SIGN_IN_REQUEST
  }
}

export const requestVerificationCode = (countryCode, phoneNumber) => {
  return {
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    },
    type: VERIFICATION_REQUEST_CODE_REQUEST
  }
}

export const submitVerificationCode = (verificationCode) => {
  return {
    payload: {
      verification_code: verificationCode
    },
    type: VERIFICATION_SUBMIT_CODE_REQUEST
  }
}
