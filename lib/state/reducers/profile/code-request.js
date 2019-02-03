import { 
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_FAILURE
} from '@state/actions/api'

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

    default:
      return state
  }
}

export default codeRequest
