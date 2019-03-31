import { combineReducers } from 'redux'
import app from 'hg/reducers/app'
import authorization from 'hg/reducers/authorization'
import profile from './profile'
import messages from 'hg/reducers/messages'

export default combineReducers({
  app,
  authorization,
  messages,
  profile
})
