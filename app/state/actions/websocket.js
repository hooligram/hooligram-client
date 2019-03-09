import {
  WEBSOCKET_CLOSE,
  WEBSOCKET_ERROR,
  WEBSOCKET_OPEN
} from 'hg/state/actions'

export const websocketClose = () => {
  return {
    type: WEBSOCKET_CLOSE,
    payload: {
    }
  }
}

export const websocketError = (err) => {
  return {
    type: WEBSOCKET_ERROR,
    payload: {
      err
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
