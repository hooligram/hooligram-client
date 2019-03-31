import {
  MESSAGING_BROADCAST_SUCCESS,
  PERSISTENCE_LOAD_STATE_SUCCESS
} from 'hg/state/actions'

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

    case PERSISTENCE_LOAD_STATE_SUCCESS: {
      const {
        payload: {
          state: {
            messages: {
              byId,
              allIds
            }
          }
        }
      } = action

      return {
        ...state,
        byId: {
          ...byId
        },
        allIds: [ ...allIds ]
      }
    }

    default:
      return state
  }
}

export default messages
