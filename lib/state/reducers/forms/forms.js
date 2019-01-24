import { SEND_MESSAGE } from '@state/actions/api'
import { SET_CURRENT_MESSAGE } from '@state/actions/forms'

const initialState = {
  currentMessage: ''
}

const forms = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        currentMessage: ''
      }
    }
    case SET_CURRENT_MESSAGE: {
      const {
        payload: {
          message
        }
      } = action
      return {
        currentMessage: message
      }
    }
    default:
      return state
  }
}

export default forms
