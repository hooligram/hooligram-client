import { combineReducers } from 'redux'
import app from '@state/reducers/app';
import authorization from '@state/reducers/authorization'
import forms from './forms'
import profile from './profile'
import messages from '@state/reducers/messages'

export default combineReducers({
  app,
  authorization,
  forms,
  messages,
  profile
})
