import { combineReducers } from 'redux'
import authorization from '@state/reducers/authorization'
import forms from './forms'
import profile from './profile'
import messages from '@state/reducers/messages'

export default combineReducers({
  authorization,
  forms,
  messages,
  profile
})
