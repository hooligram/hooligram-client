import { signIn } from 'hg/actions'
import { actions } from 'hg/constants'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode
} from 'hg/selectors'
import websocket from 'hg/websocket'

let authActionQueue = []

export default store => next => action => {
  const ws = websocket()

  if (action.type === actions.WEBSOCKET_CONNECT) {
    const state = store.getState()

    const countryCode = currentUserCountryCode(state)
    const phoneNumber = currentUserPhoneNumber(state)
    const verificationCode = currentUserVerificationCode(state)

    ws.connect(store.dispatch, countryCode, phoneNumber, verificationCode)
    return next(action)
  }

  if (action.type === actions.AUTHORIZATION_SIGN_IN_SUCCESS) {
    store.dispatch(signIn())

    authActionQueue.forEach((queued) => {
      ws.sendAction(queued)
    })

    authActionQueue = []
    return next(action)
  }

  if ([
    actions.AUTHORIZATION_SIGN_IN_REQUEST,
    actions.GROUP_ADD_MEMBER_REQUEST,
    actions.GROUP_CREATE_REQUEST,
    actions.GROUP_LEAVE_REQUEST,
    actions.MESSAGING_DELIVER_SUCCESS,
    actions.MESSAGING_SEND_REQUEST,
    actions.VERIFICATION_REQUEST_CODE_REQUEST,
    actions.VERIFICATION_SUBMIT_CODE_REQUEST
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
