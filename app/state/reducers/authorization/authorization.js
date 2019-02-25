import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  API_AUTHORIZATION_SIGN_IN_SUCCESS,
  VERIFICATION_REQUEST_CODE_REQUEST
} from '@state/actions'

export const initialState = {
  country_code: '',
  phone_number: '',
  token: ''
}

const authorization = (state = initialState, action) => {
  switch (action.type) {
    case API_AUTHORIZATION_SIGN_IN_SUCCESS: {
      const {
        payload: {
          code,
          country_code,
          phone_number
        }
      } = action

      return {
        country_code,
        phone_number,
        token: code
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
        ...authorization,
        country_code,
        phone_number
      }
    }

    default: {
      return state
    }
  }
}

export default authorization
