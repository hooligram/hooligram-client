import {
  AUTHORIZATION_SIGN_IN_REQUEST,
  MESSAGING_BROADCAST_REQUEST,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST,
  WEBSOCKET_CONNECT
} from 'hg/state/actions'
import selectors from 'hg/state/selectors'
import websocket from './websocket'

export default store => next => action => {
  const ws = websocket()

  if (action.type === WEBSOCKET_CONNECT) {
    const state = store.getState()
    const countryCode = selectors.currentUserCountryCode(state)
    const phoneNumber = selectors.currentUserPhoneNumber(state)
    const verificationCode = selectors.currentUserCode(state)

    ws.connect(store.dispatch, countryCode, phoneNumber, verificationCode)
    return next(action)
  }

  if (![
    AUTHORIZATION_SIGN_IN_REQUEST,
    MESSAGING_BROADCAST_REQUEST,
    VERIFICATION_REQUEST_CODE_REQUEST,
    VERIFICATION_SUBMIT_CODE_REQUEST
  ].includes(action.type)) {
    return next(action)
  }

  ws.sendAction(action)

  return next(action)
}
