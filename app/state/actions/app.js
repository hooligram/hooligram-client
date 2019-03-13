import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
  SIGN_IN,
  SIGN_OUT
} from '.'

export const appStartup = () => {
  return {
    type: APP_STARTUP,
    payload: {}
  }
}

export const appStartupSuccess = () => {
  return {
    type: APP_STARTUP_SUCCESS,
    payload: {}
  }
}

export const signIn = () => {
  return {
    type: SIGN_IN,
    payload: {
    }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: {
    }
  }
}
