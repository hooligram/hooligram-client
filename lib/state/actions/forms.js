export const SET_CURRENT_MESSAGE = 'SET_CURRENT_MESSAGE'
export const FORMS_VERIFICATION_SET_PHONE_NUMBER = 'FORMS:VERIFICATION_SET_PHONE_NUMBER'
export const FORMS_VERIFICATION_SET_COUNTRY_CODE = 'FORMS:VERIFICATION_SET_COUNTRY_CODE'

export const setCurrentMessage = (message) => {
  return {
    type: SET_CURRENT_MESSAGE,
    payload: {
      message
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
