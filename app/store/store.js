import { createStore, applyMiddleware } from 'redux'
import { app } from 'hg/constants'
import {
  db,
  logger,
  navigation,
  persistence,
  websocket
} from 'hg/middlewares'
import { asyncStorage } from 'hg/persistence'
import reducer from 'hg/reducers'
import appInit from 'hg/reducers/app/init'

export default asyncStorage.loadObject(app.STORE_STORAGE_KEY).then((saved) => {
  const preloaded = Object.assign(
    {
      app: null,
      authorization: null
    },
    {
      ...(saved ? saved : {}),
    },
    {
      app: appInit
    }
  )
  const store = createStore(reducer, preloaded, applyMiddleware(...middlewares))
  return store
})

const middlewares = [
  websocket,
  db,
  navigation,
  persistence,
  logger
]
