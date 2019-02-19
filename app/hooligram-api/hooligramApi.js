import { 
  websocketInitSuccess, 
  websocketError,
  websocketClose
} from '@state/actions/websocket'
import { MESSAGING_BROADCAST_SUCCESS } from '@state/actions'

let ws

const hooligramApi = (config) => (store) => {
  if (ws) {
    return ws
  }

  const { host } = config
  const { dispatch } = store
  ws = new WebSocket(host)

  ws.onopen = () => {
    dispatch(websocketInitSuccess(host))
  }

  ws.onmessage = (event) => {
    const { data } = event
    let action
    try {
      action = JSON.parse(data)
      action.type = 'API:'.concat(action.type)
    }
    catch (err) {
      action = websocketError(err)
    }

    // hack since backend currently does not provide id for each message
    // I believe it's the responsibility of backend to generate and provide
    // the message id, but we can think and discuss about it
    if (action.type === MESSAGING_BROADCAST_SUCCESS) {
      action.payload.id = `${Math.floor(Math.random() * 100000000)}`
    }

    dispatch(action)
  }

  ws.onerror = (event) => {
    const err = new Error(`WebSocketError: ${event}`)
    dispatch(websocketError(err))
  }

  ws.onclose = (event) => {
    const {
      code,
      reason
    } = event
    dispatch(websocketClose(reason, code))
    ws = undefined
  }

  return ws
}

export default hooligramApi
