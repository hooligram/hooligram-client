import {
  FORMS_SET_USERNAME_INPUT,
  FORMS_VERIFICATION_SET_CODE,
  FORMS_VERIFICATION_SET_COUNTRY_CODE,
  FORMS_VERIFICATION_SET_PHONE_NUMBER
} from 'hg/state/actions'

export const setVerificationCode = (code) => {
  return {
    type: FORMS_VERIFICATION_SET_CODE,
    payload: {
      code
    }
  }
}

export const setPhoneNumber = (phoneNumber) => {
  return {
    type: FORMS_VERIFICATION_SET_PHONE_NUMBER,
    payload: {
      phoneNumber
    }
  }
}

export const setCountryCode = (countryCode, countryName) => {
  return {
    type: FORMS_VERIFICATION_SET_COUNTRY_CODE,
    payload: {
      countryCode,
      countryName
    }
  }
}

export const setUserNameInput = (userNameInput) => {
  return {
    type: FORMS_SET_USERNAME_INPUT,
    payload: {
      userNameInput
    }
  }
}
