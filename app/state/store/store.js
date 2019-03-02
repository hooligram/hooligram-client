import { createStore, applyMiddleware } from 'redux'
import { NavigationActions } from 'react-navigation'
import reducer from '@state/reducers'
import api from '@state/middlewares/api'
import logger from '@state/middlewares/logger'
import navigation from '@state/middlewares/navigation'
import persistence from '@state/middlewares/persistence'
import getOrCreateWsClient from 'hg/websocket'
import PersistenceApi from '@persistence-api'

const middlewares = [
  persistence(PersistenceApi),
  api(getOrCreateWsClient),
  navigation(NavigationActions),
  logger
]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
