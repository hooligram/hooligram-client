import { 
  apiInitSuccess, 
  apiError,
  apiClose
} from '@state/actions/api'

let ws

const hooligramApi = (config) => (store) => {
  if (ws) {
    return ws
  }

  const { host } = config
  const { dispatch } = store
  ws = new WebSocket(host)

  ws.onopen = () => {
    dispatch(apiInitSuccess())
  }

  ws.onmessage = (event) => {
    const { data } = event
    let action
    try {
      action = JSON.parse(data)
    }
    catch (err) {
      action = apiError(err)
    }
    dispatch(action)
  }

  ws.onerror = (event) => {
    const err = new Error(`WebSocketError: ${event}`)
    dispatch(apiError(err))
  }

  ws.onclose = (event) => {
    const {
      code,
      reason
    } = event
    dispatch(apiClose(reason, code))
    ws = undefined
  }

  return ws
}

export default hooligramApi
