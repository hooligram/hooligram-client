import { createStore, applyMiddleware } from 'redux'
import { NavigationActions } from 'react-navigation'
import reducer from 'hg/state/reducers'
import websocket from 'hg/state/middlewares/websocket'
import logger from 'hg/state/middlewares/logger'
import navigation from 'hg/state/middlewares/navigation'
import persistence from 'hg/state/middlewares/persistence'
import { default as _persistence } from 'hg/persistence'

const middlewares = [
  persistence(_persistence),
  websocket,
  navigation(NavigationActions),
  logger
]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
