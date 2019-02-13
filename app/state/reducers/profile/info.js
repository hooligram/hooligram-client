import { SAVE_USER_NAME } from '@state/actions/profile'
import {
  PERSISTENCE_SAVE_STATE_REQUEST,
  PERSISTENCE_SAVE_STATE_SUCCESS,
  PERSISTENCE_SAVE_STATE_FAILURE
} from '@state/actions/persistence'

const initialState = {
  isSaved: false,
  isSaving: false,
  userName: ''
}

const info = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_NAME: {
      const {
        payload: {
          userName
        }
      } = action

      return {
        ...state,
        userName
      }
    }

    case PERSISTENCE_SAVE_STATE_REQUEST: {
      return {
        ...state,
        isSaving: true
      }
    }
    
    case PERSISTENCE_SAVE_STATE_SUCCESS: {
      return {
        ...state,
        isSaving: false,
        isSaved: true
      }
    }

    case PERSISTENCE_SAVE_STATE_FAILURE: {
      return {
        ...state,
        isSaved: false,
        isSaving: false
      }
    }

    default:
      return state
  }
}

export default info
