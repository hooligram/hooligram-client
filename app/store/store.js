import { createStore, applyMiddleware } from 'redux'
import logger from 'hg/middlewares/logger'
import navigation from 'hg/middlewares/navigation'
import persistence from 'hg/middlewares/persistence'
import websocket from 'hg/middlewares/websocket'
import reducer from 'hg/reducers'

const middlewares = [
  persistence,
  websocket,
  navigation,
  logger
]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
