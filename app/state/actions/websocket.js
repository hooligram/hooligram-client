export const WEBSOCKET_INIT_REQUEST = 'WEBSOCKET:INIT_REQUEST'
export const WEBSOCKET_INIT_SUCCESS = 'WEBSOCKET:INIT_SUCCESS'
export const WEBSOCKET_ERROR = 'WEBSOCKET:ERROR'
export const WEBSOCKET_CLOSE = 'WEBSOCKET:CLOSE'

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
