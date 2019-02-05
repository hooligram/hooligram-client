export const SEND_MESSAGE = 'SEND_MESSAGE'

export const API_INIT_REQUEST = 'API_INIT_REQUEST'
export const API_INIT_SUCCESS = 'API_INIT_SUCCESS'
export const API_ERROR = 'API_ERROR'
export const API_CLOSE = 'API_CLOSE'

export const apiInit = () => {
  return {
    type: API_INIT_REQUEST,
    payload: {}
  }
}

export const apiInitSuccess = () => {
  return {
    type: API_INIT_SUCCESS,
    payload: {}
  }
}

export const apiClose = (reason, code) => {
  return {
    type: API_CLOSE,
    payload: {
      reason,
      code
    }
  }
}

export const apiError = (err) => {
  return {
    type: API_ERROR,
    payload: {
      err
    }
  }
}

export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: {
      message
    }
  }
}
