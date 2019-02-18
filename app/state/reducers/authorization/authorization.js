import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  API_AUTHORIZATION_SIGN_IN_SUCCESS
} from '@state/actions'

export const initialState = {
  token: {}
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
        token: {
          code,
          country_code,
          phone_number
        }
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

    default: {
      return state
    }
  }
}

export default authorization
