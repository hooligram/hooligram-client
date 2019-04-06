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
import { initialState } from 'hg/reducers/app/app'

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
      app: initialState
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
