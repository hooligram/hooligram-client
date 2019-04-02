import {
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
          country_code,
          phone_number,
          verification_code,
        }
      } = action

      return {
        country_code,
        phone_number,
        token: verification_code
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
          verification_code
        }
      } = action

      return {
        ...state,
        token: verification_code
      }
    }

    default: {
      return state
    }
  }
}

export default authorization
