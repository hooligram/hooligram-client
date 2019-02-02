import {
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '@state/actions/profile'

const initialState = {
  verification: {
    isLoading: false,
    isVerified: false
  }
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_SUBMIT_CODE_REQUEST: {
      return {
        verification: {
          ...state.verification,
          isLoading: true
        }
      }
    }
    default:
      return state
  }
}

export default profile
