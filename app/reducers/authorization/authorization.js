import { actions } from 'hg/constants'
import init from './init'

export default (state = init, action) => {
  switch (action.type) {
    case actions.SIGN_OUT: {
      return {
        ...state,
        country_code: '',
        phone_number: '',
        verification_code: ''
      }
    }

    case actions.VERIFICATION_REQUEST_CODE_REQUEST: {
      const countryCode = action.payload.country_code
      const phoneNumber = action.payload.phone_number

      return {
        ...state,
        country_code: countryCode,
        phone_number: phoneNumber
      }
    }

    case actions.VERIFICATION_SUBMIT_CODE_REQUEST: {
      const verificationCode = action.payload.verification_code

      return {
        ...state,
        verification_code: verificationCode
      }
    }

    default: {
      return state
    }
  }
}
