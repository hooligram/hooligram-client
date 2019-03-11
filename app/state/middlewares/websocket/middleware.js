import { WEBSOCKET_CONNECT } from 'hg/state/actions'
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

  if (!action.type.match(/^API:(.*)_REQUEST$/)) {
    return next(action)
  }

  ws.sendAction(action)

  return next(action)
}
