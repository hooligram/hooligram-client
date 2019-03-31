import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
  SIGN_IN,
  SIGN_OUT,
  WEBSOCKET_CLOSE,
  WEBSOCKET_OPEN
} from 'hg/actions'

export const initialState = {
  isSignedIn: false,
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

    case SIGN_IN: {
      return {
        ...state,
        isSignedIn: true
      }
    }

    case SIGN_OUT: {
      return {
        ...state,
        isSignedIn: false
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
