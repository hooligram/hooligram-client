import { combineReducers } from 'redux'
import app from 'hg/reducers/app'
import authorization from 'hg/reducers/authorization'

export default combineReducers({
  app,
  authorization
})
