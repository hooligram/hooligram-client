import { createStore, applyMiddleware } from 'redux'
import { NavigationActions } from 'react-navigation'
import { apiInit } from '@state/actions/api'
import reducer from '@state/reducers'
import api from '@state/middlewares/api'
import navigation from '@state/middlewares/navigation'
import getOrCreateWsClient from '@hooligram-api'

const middlewares = [
  api(getOrCreateWsClient),
  navigation(NavigationActions),
  (store) => next => action => {
    console.log('prevState', store.getState())
    console.log('action', action)
    const nextAction = next(action)
    console.log('nextState', store.getState())
    return nextAction
  },
]

const store = createStore(reducer, applyMiddleware(...middlewares))

store.dispatch(apiInit())

export default store 
