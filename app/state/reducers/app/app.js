import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
  WEBSOCKET_CLOSE,
  WEBSOCKET_INIT_SUCCESS
} from 'hg/state/actions'

export const initialState = {
  isStartupDone: false,
  websocketOnline: false
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
