import { actions } from 'hg/constants'

export const initialState = {
  country_code: '',
  phone_number: '',
  token: ''
}

const authorization = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_OUT: {
      return {
        ...state,
        country_code: '',
        phone_number: '',
        token: ''
      }
    }

    case actions.VERIFICATION_REQUEST_CODE_REQUEST: {
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

    case actions.VERIFICATION_SUBMIT_CODE_REQUEST: {
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
