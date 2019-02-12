import { 
  websocketInitSuccess, 
  websocketError,
  websocketClose
} from '@state/actions/websocket'

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
