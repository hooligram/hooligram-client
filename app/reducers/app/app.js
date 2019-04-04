import {
  SIGN_IN,
  SIGN_OUT,
  WEBSOCKET_CLOSE,
  WEBSOCKET_OPEN
} from 'hg/actions'

export const initialState = {
  isSignedIn: false,
  isWebsocketOnline: false
}

const app = (state = initialState, action) => {
  switch (action.type) {
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
