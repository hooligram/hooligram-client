import { actions } from 'hg/constants'

export const websocketClose = () => {
  return {
    type: actions.WEBSOCKET_CLOSE,
    payload: {
    }
  }
}

export const websocketConnect = () => {
  return {
    type: actions.WEBSOCKET_CONNECT,
    payload: {
    }
  }
}

export const websocketOpen = (host) => {
  return {
    type: actions.WEBSOCKET_OPEN,
    payload: {
      host
    }
  }
}
