import websocket from './websocket'

export default store => next => action => {
  const ws = websocket(store)

  if (!store.getState().app.isWebsocketOnline) {
    return next(action)
  }

  if (!action.type.match(/^API:(.*)_REQUEST$/)) {
    return next(action)
  }

  const actionString = JSON.stringify({
    ...action,
    type: action.type.replace('API:', '')
  })

  try {
    ws.send(actionString)
  }
  catch (err) {
    console.log(err)
  }

  return next(action)
}
