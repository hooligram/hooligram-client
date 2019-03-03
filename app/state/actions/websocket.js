import {
  WEBSOCKET_CLOSE,
  WEBSOCKET_ERROR,
  WEBSOCKET_INIT_REQUEST,
  WEBSOCKET_INIT_SUCCESS
} from 'hg/state/actions'

export const websocketInitRequest = () => {
  return {
    type: WEBSOCKET_INIT_REQUEST,
    payload: {}
  }
}

export const websocketInitSuccess = (host) => {
  return {
    type: WEBSOCKET_INIT_SUCCESS,
    payload: {
      host
    }
  }
}

export const websocketClose = (reason, code) => {
  return {
    type: WEBSOCKET_CLOSE,
    payload: {
      reason,
      code
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
