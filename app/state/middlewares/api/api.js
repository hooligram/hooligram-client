let ws

const api = getOrCreateWsClient => store => next => action => {
  if (action.type === 'API_INIT_REQUEST') { 
    ws = getOrCreateWsClient(store)
  }

  if (![
    '_REQUEST', 
    '_SUCCCESS', 
    '_FAILURE'
  ].some(action.type.startsWith(exp))) {
    return next(action)
  }

  const actionString = JSON.stringify(action)
  ws.send(actionString)

  return next(action)
}

export default api
