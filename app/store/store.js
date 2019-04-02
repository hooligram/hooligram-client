import { createStore, applyMiddleware } from 'redux'
import { app } from 'hg/constants'
import logger from 'hg/middlewares/logger'
import navigation from 'hg/middlewares/navigation'
import persistence from 'hg/middlewares/persistence'
import websocket from 'hg/middlewares/websocket'
import { asyncStorage } from 'hg/persistence'
import reducer from 'hg/reducers'

const middlewares = [
  websocket,
  navigation,
  persistence,
  logger
]

const store = asyncStorage.loadObject(app.STORE_STORAGE_KEY).then((preloaded) => {
  const store = createStore(reducer, preloaded, applyMiddleware(...middlewares))
  return store
})

export default store
