import { 
  PERSISTENCE_LOAD_STATE_SUCCESS,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_FAILURE,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '@state/actions'

const initialState = {
  isLoading: false,
  isLoaded: false,
  isSuccess: false,
  code: '',
  country_code: '',
  phone_number: ''
}

const codeRequest = (state = initialState, action) => {
  switch (action.type) {
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
        phone_number,
        isLoading: true
      }
    }

    case VERIFICATION_REQUEST_CODE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSuccess: true
      }
    }

    case VERIFICATION_REQUEST_CODE_FAILURE: {
      return {
        ...state,
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

    case VERIFICATION_SUBMIT_CODE_REQUEST: {
      const {
        payload: {
          code
        }
      } = action

      return {
        ...state,
        code
      }
    }

    default:
      return state
  }
}

export default codeRequest
