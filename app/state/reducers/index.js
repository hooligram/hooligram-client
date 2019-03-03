import { combineReducers } from 'redux'
import app from 'hg/state/reducers/app'
import authorization from 'hg/state/reducers/authorization'
import profile from './profile'
import messages from 'hg/state/reducers/messages'

export default combineReducers({
  app,
  authorization,
  messages,
  profile
})
