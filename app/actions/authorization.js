import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '.'

export const authorizationSignInRequest = (
  actionId,
  countryCode,
  phoneNumber,
  verificationCode
) => {
  return {
    id: actionId,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber,
      verification_code: verificationCode
    },
    type: AUTHORIZATION_SIGN_IN_REQUEST
  }
}

export const requestVerificationCode = (actionId, countryCode, phoneNumber) => {
  return {
    id: actionId,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    },
    type: VERIFICATION_REQUEST_CODE_REQUEST
  }
}

export const submitVerificationCode = (actionId, verificationCode) => {
  return {
    id: actionId,
    payload: {
      verification_code: verificationCode
    },
    type: VERIFICATION_SUBMIT_CODE_REQUEST
  }
}
