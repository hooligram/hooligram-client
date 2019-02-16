import { API_AUTHORIZATION_SIGN_IN_SUCCESS } from '@state/actions/authorization'

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

    default: {
      return state
    }
  }
}

export default authorization
