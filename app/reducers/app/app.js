import { actions } from 'hg/constants'
import init from './init'

export default (state = init, action) => {
  switch (action.type) {
    case actions.SIGN_IN: {
      return {
        ...state,
        isSignedIn: true
      }
    }

    case actions.SIGN_OUT: {
      return {
        ...state,
        isSignedIn: false
      }
    }

    case actions.WEBSOCKET_CLOSE: {
      return {
        ...state,
        isWebsocketOnline: false
      }
    }

    case actions.WEBSOCKET_OPEN: {
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
