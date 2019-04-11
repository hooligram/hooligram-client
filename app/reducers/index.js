import { combineReducers } from 'redux'
import app from './app'
import authorization from './authorization'

export default combineReducers({
  app,
  authorization
})
