import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '.'

export const authorizationSignInRequest = (id, countryCode, phoneNumber, verificationCode) => {
  return {
    id,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber,
      verification_code: verificationCode
    },
    type: AUTHORIZATION_SIGN_IN_REQUEST
  }
}

export const requestVerificationCode = (id, countryCode, phoneNumber) => {
  return {
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    },
    type: VERIFICATION_REQUEST_CODE_REQUEST
  }
}

export const submitVerificationCode = (id, verificationCode) => {
  return {
    id,
    payload: {
      verification_code: verificationCode
    },
    type: VERIFICATION_SUBMIT_CODE_REQUEST
  }
}
