import { createStore, applyMiddleware } from 'redux'
import reducer from 'hg/state/reducers'
import websocket from 'hg/state/middlewares/websocket'
import logger from 'hg/state/middlewares/logger'
import navigation from 'hg/state/middlewares/navigation'
import persistence from 'hg/state/middlewares/persistence'

const middlewares = [
  persistence,
  websocket,
  navigation,
  logger
]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
