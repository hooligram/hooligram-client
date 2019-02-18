import { MESSAGING_BROADCAST_SUCCESS } from '@state/actions'

const initialState = {
  byId: {},
  allIds: []
}

const messages = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGING_BROADCAST_SUCCESS: {
      const {
        payload: {
          id,
          message,
          sender: {
            country_code,
            phone_number
          }
        }
      } = action

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            message,
            sender: {
              country_code,
              phone_number
            }
          }
        },
        allIds: [ ...state.allIds ].concat(id)
      }
    }
    default:
      return state
  }
}

export default messages
