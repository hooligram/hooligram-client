import { APP_STARTUP } from 'hg/state/actions'
import { websocketInitRequest } from 'hg/state/actions/websocket'

export const ws = {
  sendMessage: (messageString) => {
    ws._ws.send(messageString)
  }
}

const middleware = websocket => store => next => action => {
  if (action.type === APP_STARTUP) {
    const returnedAction = next(action)
    store.dispatch(websocketInitRequest())
    ws._ws = websocket(store)
    return returnedAction
  }

  if (!action.type.match(/^API:(.*)_REQUEST$/)) {
    return next(action)
  }

  const actionString = JSON.stringify({
    ...action,
    type: action.type.replace('API:', '')
  })
  ws.sendMessage(actionString)

  return next(action)
}

export default middleware
