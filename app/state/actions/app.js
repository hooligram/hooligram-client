import {
  APP_STARTUP,
} from '.'

export const appStartup = () => {
  return {
    type: APP_STARTUP,
    payload: {}
  }
}
