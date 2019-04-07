import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  AUTHORIZATION_SIGN_IN_SUCCESS,
  GROUP_ADD_MEMBER_REQUEST,
  GROUP_CREATE_REQUEST,
  GROUP_LEAVE_REQUEST,
  MESSAGING_SEND_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST,
  WEBSOCKET_CONNECT
} from 'hg/actions'
import { signIn } from 'hg/actions/app'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode
} from 'hg/selectors'
import websocket from 'hg/websocket'

let authActionQueue = []

export default store => next => action => {
  const ws = websocket()

  if (action.type === WEBSOCKET_CONNECT) {
    const state = store.getState()

    const countryCode = currentUserCountryCode(state)
    const phoneNumber = currentUserPhoneNumber(state)
    const verificationCode = currentUserVerificationCode(state)

    ws.connect(store.dispatch, countryCode, phoneNumber, verificationCode)
    return next(action)
  }

  if (action.type === AUTHORIZATION_SIGN_IN_SUCCESS) {
    store.dispatch(signIn())

    authActionQueue.forEach((queued) => {
      ws.sendAction(queued)
    })

    authActionQueue = []
    return next(action)
  }

  if ([
    AUTHORIZATION_SIGN_IN_REQUEST,
    GROUP_ADD_MEMBER_REQUEST,
    GROUP_CREATE_REQUEST,
    GROUP_LEAVE_REQUEST,
    MESSAGING_SEND_REQUEST,
    VERIFICATION_REQUEST_CODE_REQUEST,
    VERIFICATION_SUBMIT_CODE_REQUEST
  ].includes(action.type)) {
    ws.sendAction(action)
    return next(action)
  }

  if (!store.getState().app.isSignedIn) {
    authActionQueue.push(action)
    return next(action)
  }

  ws.sendAction(action)

  return next(action)
}
