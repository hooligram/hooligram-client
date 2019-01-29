import { createStore, applyMiddleware } from 'redux'
import reducer from '@state/reducers'
import api from '@state/middlewares/api'
import getOrCreateWsClient from '@hooligram-api'

const middlewares = [
  api(getOrCreateWsClient),
  (store) => next => action => {
    console.log('prevState', store.getState())
    console.log('action', action)
    const nextAction = next(action)
    console.log('nextState', store.getState())
    return nextAction
  },
]

const store = createStore(reducer, applyMiddleware(...middlewares))

store.dispatch({
  type: 'API_INIT_REQUEST',
  payload: {}
})

export default store 
