import {
  APP_STARTUP,
  APP_STARTUP_SUCCESS,
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
