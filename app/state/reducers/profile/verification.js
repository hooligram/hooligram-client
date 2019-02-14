import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_FAILURE,
  VERIFICATION_SUBMIT_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_SUCCESS
} from '@state/actions'

const initialState = {
  isLoading: false,
  isVerified: false
}

const verification = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_SUBMIT_CODE_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case VERIFICATION_SUBMIT_CODE_SUCCESS: {
      return {
        isVerified: true,
        isLoading: false
      }
    }

    case VERIFICATION_SUBMIT_CODE_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    case PERSISTENCE_LOAD_STATE_SUCCESS: {
      const {
        payload: {
          state: {
            profile: {
              verification
            }
          }
        }
      } = action
      
      return {
        ...verification
      }
    }

    default:
      return state
  }
}

export default verification
