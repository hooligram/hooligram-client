export const PERSISTENCE_LOAD_STATE_REQUEST = 'PERSISTENCE:LOAD_STATE_REQUEST'
export const PERSISTENCE_LOAD_STATE_SUCCESS = 'PERSISTENCE:LOAD_STATE_SUCCESS'
export const PERSISTENCE_LOAD_STATE_FAILURE = 'PERSISTENCE:LOAD_STATE_FAILURE'

export const PERSISTENCE_SAVE_STATE_REQUEST = 'PERSISTENCE:SAVE_STATE_REQUEST'
export const PERSISTENCE_SAVE_STATE_SUCCESS = 'PERSISTENCE:SAVE_STATE_SUCCESS'
export const PERSISTENCE_SAVE_STATE_FAILURE = 'PERSISTENCE:SAVE_STATE_FAILURE'

export const loadStateRequest = () => {
  return {
    type: PERSISTENCE_LOAD_STATE_REQUEST,
    payload: {}
  }
}

export const loadStateSuccess = (state) => {
  return {
    type: PERSISTENCE_LOAD_STATE_SUCCESS,
    payload: {
      state
    }
  }
}

export const loadStateFailure = (error) => {
  return {
    type: PERSISTENCE_LOAD_STATE_FAILURE,
    payload: {
      error
    }
  }
}

export const saveStateRequest = (state) => {
  return {
    type: PERSISTENCE_SAVE_STATE_REQUEST,
    payload: {
      state
    }
  }
}

export const saveStateSuccess = () => {
  return {
    type: PERSISTENCE_SAVE_STATE_SUCCESS,
    payload: {}
  }
}

export const saveStateFailure = (error) => {
  return {
    type: PERSISTENCE_SAVE_STATE_FAILURE,
    payload: {
      error
    }
  }
}
