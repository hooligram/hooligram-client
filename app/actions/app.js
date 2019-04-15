import { actions } from 'hg/constants'

export const connKeepAliveRequest = (actionId) => {
  return {
    id: actionId,
    payload: {},
    type: actions.CONN_KEEP_ALIVE_REQUEST
  }
}

export const signIn = () => {
  return {
    payload: {},
    type: actions.SIGN_IN
  }
}

export const signOut = () => {
  return {
    payload: {},
    type: actions.SIGN_OUT
  }
}
