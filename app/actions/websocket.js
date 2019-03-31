import {
  WEBSOCKET_CLOSE,
  WEBSOCKET_CONNECT,
  WEBSOCKET_OPEN
} from 'hg/actions'

export const websocketClose = () => {
  return {
    type: WEBSOCKET_CLOSE,
    payload: {
    }
  }
}

export const websocketConnect = () => {
  return {
    type: WEBSOCKET_CONNECT,
    payload: {
    }
  }
}

export const websocketOpen = (host) => {
  return {
    type: WEBSOCKET_OPEN,
    payload: {
      host
    }
  }
}
