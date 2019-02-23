import {
  WEBSOCKET_CLOSE,
  WEBSOCKET_INIT_SUCCESS
} from '@state/actions'

export const initialState = {
  websocketOnline: false,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKET_CLOSE: {
      return {
        ...state,
        websocketOnline: false
      }
    }

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
