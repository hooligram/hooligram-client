import Config from 'react-native-config'
import { MESSAGING_BROADCAST_SUCCESS } from 'hg/state/actions'
import { authorizationSignInRequest } from 'hg/state/actions/authorization'
import {
  websocketClose,
  websocketOpen
} from 'hg/state/actions/websocket'
import selectors from 'hg/state/selectors'

let instance

export default (store) => {
  if (instance) return instance

  instance = websocket(store)
  return instance
}

const websocket = (store) => {
  const { dispatch } = store

  const state = store.getState()
  const code = selectors.currentUserCode(state)
  const countryCode = selectors.currentUserCountryCode(state)
  const phoneNumber = selectors.currentUserPhoneNumber(state)

  const ws = new WebSocket(Config.API_HOST)

  ws.onopen = () => {
    dispatch(websocketOpen(Config.API_HOST))
    const shouldReconnect = code && countryCode && phoneNumber

    if (shouldReconnect) {
      dispatch(authorizationSignInRequest(code, countryCode, phoneNumber))
    }
  }

  ws.onmessage = (event) => {
    const { data } = event
    let action

    try {
      action = JSON.parse(data)
      action.type = 'API:'.concat(action.type)
    }
    catch (err) {
      if (__DEV__) {
        console.log('__WEBSOCKET__ action parse error')
        console.log(err)
      }

      return
    }

    // hack since backend currently does not provide id for each message
    // I believe it's the responsibility of backend to generate and provide
    // the message id, but we can think and discuss about it
    if (action.type === MESSAGING_BROADCAST_SUCCESS) {
      action.payload.id = `${Math.floor(Math.random() * 100000000)}`
    }

    dispatch(action)
  }

  ws.onclose = () => {
    instance = null
    dispatch(websocketClose())
  }

  return ws
}
