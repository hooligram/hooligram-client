import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
  WEBSOCKET_CLOSE,
  WEBSOCKET_OPEN
} from 'hg/state/actions'

export const initialState = {
  isStartupDone: false,
  isWebsocketOnline: false
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case APP_STARTUP: {
      return {
        ...state,
        isStartupDone: false
      }
    }

    case APP_STARTUP_SUCCESS: {
      return {
        ...state,
        isStartupDone: true
      }
    }

    case WEBSOCKET_CLOSE: {
      return {
        ...state,
        isWebsocketOnline: false
      }
    }

    case WEBSOCKET_OPEN: {
      return {
        ...state,
        isWebsocketOnline: true
      }
    }

    default: {
      return state
    }
  }
}

export default app
