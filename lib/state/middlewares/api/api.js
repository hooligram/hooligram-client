let ws

const api = getOrCreateWsClient => store => next => action => {
  if (action.type === 'API_INIT_REQUEST') { 
    ws = getOrCreateWsClient(store)
  }

  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const actionString = JSON.stringify({
    ...action,
    type: action.type.replace('API:', '')
  })
  ws.send(actionString)

  return next(action)
}

export default api
