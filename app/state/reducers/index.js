import { combineReducers } from 'redux'
import authorization from '@state/reducers/authorization'
import forms from './forms'
import profile from './profile'

export default combineReducers({
  authorization,
  forms,
  profile
})
