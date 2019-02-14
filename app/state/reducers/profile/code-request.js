import { 
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_FAILURE
} from '@state/actions/profile'
import { PERSISTENCE_LOAD_STATE_SUCCESS } from '@state/actions'

const initialState = {
  isLoading: false,
  isLoaded: false,
  isSuccess: false
}

const codeRequest = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_REQUEST_CODE_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case VERIFICATION_REQUEST_CODE_SUCCESS: {
      return {
        isLoading: false,
        isLoaded: true,
        isSuccess: true
      }
    }

    case VERIFICATION_REQUEST_CODE_FAILURE: {
      return {
        isLoading: false,
        isLoaded: true,
        isSuccess: false
      }
    }

    case PERSISTENCE_LOAD_STATE_SUCCESS: {
      const {
        payload: {
          state: {
            profile: {
              codeRequest
            }
          }
        }
      } = action

      return {
        ...codeRequest
      }
    }

    default:
      return state
  }
}

export default codeRequest
