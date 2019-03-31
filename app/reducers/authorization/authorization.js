import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  AUTHORIZATION_SIGN_IN_SUCCESS,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from 'hg/actions'

export const initialState = {
  country_code: '',
  phone_number: '',
  token: ''
}

const authorization = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_SIGN_IN_SUCCESS: {
      const {
        payload: {
          country_code: countryCode,
          phone_number: phoneNumber,
          verification_code: verificationCode
        }
      } = action

      return {
        country_code: countryCode,
        phone_number: phoneNumber,
        token: verificationCode
      }
    }

    case PERSISTENCE_LOAD_STATE_SUCCESS: {
      const {
        payload: {
          state: {
            authorization
          }
        }
      } = action

      return {
        ...authorization
      }
    }

    case VERIFICATION_REQUEST_CODE_REQUEST: {
      const {
        payload: {
          country_code,
          phone_number
        }
      } = action

      return {
        ...state,
        country_code,
        phone_number
      }
    }

    case VERIFICATION_SUBMIT_CODE_REQUEST: {
      const {
        payload: {
          code
        }
      } = action

      return {
        ...state,
        token: code
      }
    }

    default: {
      return state
    }
  }
}

export default authorization
