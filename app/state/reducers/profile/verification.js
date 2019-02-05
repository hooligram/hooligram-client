import {
  VERIFICATION_SUBMIT_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_FAILURE
} from '@state/actions/profile'

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

    default:
      return state
  }
}

export default verification
