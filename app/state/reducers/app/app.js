import {
  WEBSOCKET_INIT_SUCCESS
} from '@state/actions'

export const initialState = {
  websocketOnline: false,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKET_INIT_SUCCESS: {
      return {
        ...state,
        websocketOnline: true
      }
    }

    default: {
      return state
    }
  }
}

export default app
