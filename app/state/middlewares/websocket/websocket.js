import Config from 'react-native-config'
import { MESSAGING_BROADCAST_SUCCESS } from 'hg/state/actions'
import { authorizationSignInRequest } from 'hg/state/actions/authorization'
import {
  websocketClose,
  websocketConnect,
  websocketOpen
} from 'hg/state/actions/websocket'

let instance

export default () => {
  return {
    connect: (dispatch, countryCode, phoneNumber, verificationCode) => {
      instance = websocket(dispatch, countryCode, phoneNumber, verificationCode)
    },

    sendAction: (action) => {
      try {
        instance.send(JSON.stringify(action))
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}

const websocket = (dispatch, countryCode, phoneNumber, verificationCode) => {
  const ws = new WebSocket(Config.API_HOST)

  ws.onopen = () => {
    dispatch(websocketOpen(Config.API_HOST))
    const canSignIn = countryCode && phoneNumber && verificationCode

    if (canSignIn) {
      dispatch(authorizationSignInRequest(verificationCode, countryCode, phoneNumber))
    }
  }

  ws.onmessage = (event) => {
    const { data } = event
    let action

    try {
      action = JSON.parse(data)
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
    setTimeout(() => {
      dispatch(websocketConnect())
    }, 1000)
  }

  return ws
}
