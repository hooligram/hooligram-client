import { actions } from 'hg/constants'

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
    type: actions.AUTHORIZATION_SIGN_IN_REQUEST
  }
}

export const requestVerificationCode = (actionId, countryCode, phoneNumber) => {
  return {
    id: actionId,
    payload: {
      country_code: countryCode,
      phone_number: phoneNumber
    },
    type: actions.VERIFICATION_REQUEST_CODE_REQUEST
  }
}

export const submitVerificationCode = (actionId, verificationCode) => {
  return {
    id: actionId,
    payload: {
      verification_code: verificationCode
    },
    type: actions.VERIFICATION_SUBMIT_CODE_REQUEST
  }
}
