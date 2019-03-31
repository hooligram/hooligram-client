import {
  PERSISTENCE_LOAD_STATE_SUCCESS
} from 'hg/actions'

const initialState = {
  byId: {},
  allIds: []
}

const messages = (state = initialState, action) => {
  switch (action.type) {
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
