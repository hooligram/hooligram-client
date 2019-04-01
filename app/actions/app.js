import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
  CONN_KEEP_ALIVE_REQUEST,
  SIGN_IN,
  SIGN_OUT
} from '.'

export const appStartup = () => {
  return {
    payload: {
    },
    type: APP_STARTUP
  }
}

export const appStartupSuccess = () => {
  return {
    payload: {
    },
    type: APP_STARTUP_SUCCESS
  }
}

export const connKeepAliveRequest = () => {
  return {
    payload: {
    },
    type: CONN_KEEP_ALIVE_REQUEST
  }
}

export const signIn = () => {
  return {
    payload: {
    },
    type: SIGN_IN
  }
}

export const signOut = () => {
  return {
    payload: {
    },
    type: SIGN_OUT
  }
}
