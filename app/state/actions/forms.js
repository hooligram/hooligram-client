export const FORMS_VERIFICATION_SET_PHONE_NUMBER = 'FORMS:VERIFICATION_SET_PHONE_NUMBER'
export const FORMS_VERIFICATION_SET_COUNTRY_CODE = 'FORMS:VERIFICATION_SET_COUNTRY_CODE'
export const FORMS_VERIFICATION_SET_CODE = 'FORMS:VERIFICATION_SET_CODE'

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
