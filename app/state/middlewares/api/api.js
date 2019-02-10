import { APP_STARTUP } from '@state/actions/app'
import { apiInit } from '@state/actions/api'

let ws

const api = getOrCreateWsClient => store => next => action => {
  if (action.type === APP_STARTUP) {
    store.dispatch(apiInit()) 
    ws = getOrCreateWsClient(store)
    return next(action)
  }

  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  actionString = JSON.stringify({
    ...action,
    type: action.type.replace('API:', '')
  })
  ws.send(actionString)

  return next(action)
}

export default api
