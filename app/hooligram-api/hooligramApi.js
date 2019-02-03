
let ws

const hooligramApi = (config) => (store) => {
  if (ws) {
    return ws
  }

  const { host } = config
  const { dispatch } = store
  ws = new WebSocket(host)

  ws.onopen = () => {
    dispatch({
      type: 'API_INIT',
      payload: {}
    })
  }

  ws.onmessage = (event) => {
    const { data } = event
    let action
    try {
      action = JSON.parse(data)
    }
    catch (err) {
      action = {
        type: 'API_ERROR',
        payload: {
          err
        }
      }
    }
    dispatch(action)
  }

  ws.onerror = (event) => {
    const action = {
      type: 'API_ERROR',
      payload: {
        err: new Error(`WebSocketError: ${event}`)
      }
    }
    dispatch(action)
  }

  ws.onclose = (event) => {
    const {
      code,
      reason
    } = event
    dispatch({
      type: 'API_CLOSE',
      payload: {
        reason,
        code
      }
    })
    ws = undefined
  }

  return ws
}

export default hooligramApi
