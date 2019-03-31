import {
  PERSISTENCE_LOAD_STATE_FAILURE,
  PERSISTENCE_LOAD_STATE_REQUEST,
  PERSISTENCE_LOAD_STATE_SUCCESS,
  PERSISTENCE_SAVE_STATE_FAILURE,
  PERSISTENCE_SAVE_STATE_REQUEST,
  PERSISTENCE_SAVE_STATE_SUCCESS
} from 'hg/actions'

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
