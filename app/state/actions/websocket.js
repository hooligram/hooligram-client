import {
  WEBSOCKET_CLOSE,
  WEBSOCKET_OPEN
} from 'hg/state/actions'

export const websocketClose = () => {
  return {
    type: WEBSOCKET_CLOSE,
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
