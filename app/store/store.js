import { createStore, applyMiddleware } from 'redux'
import reducer from 'hg/reducers'
import websocket from 'hg/middlewares/websocket'
import logger from 'hg/middlewares/logger'
import navigation from 'hg/middlewares/navigation'
import persistence from 'hg/middlewares/persistence'

const middlewares = [
  persistence,
  websocket,
  navigation,
  logger
]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
