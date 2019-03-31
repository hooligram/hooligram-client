import Config from 'react-native-config'
import { MESSAGING_BROADCAST_SUCCESS } from 'hg/actions'
import { signOut } from 'hg/actions/app'
import { authorizationSignInRequest } from 'hg/actions/authorization'
import { connKeepAliveRequest } from 'hg/actions/app'
import {
  websocketClose,
  websocketConnect,
  websocketOpen
} from 'hg/actions/websocket'

const KEEP_ALIVE_REQUEST_INTERVAL = 30000
const RECONNECT_INTERVAL = 1000

let instance
let keepAliveIntervalId

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
        console.log('__WEBSOCKET__ send action error')
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
      instance.send(JSON.stringify(authorizationSignInRequest(verificationCode, countryCode, phoneNumber)))
    }

    keepAliveIntervalId = setInterval(() => {
      instance.send(JSON.stringify(connKeepAliveRequest()))
    }, KEEP_ALIVE_REQUEST_INTERVAL)
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
    clearInterval(keepAliveIntervalId)
    dispatch(websocketClose())
    dispatch(signOut())
    setTimeout(() => {
      dispatch(websocketConnect())
    }, RECONNECT_INTERVAL)
  }

  return ws
}
