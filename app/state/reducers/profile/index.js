import { combineReducers } from 'redux'
import verification from './verification'
import codeRequest from './code-request'
import info from './info'

export default combineReducers({
  verification,
  codeRequest,
  info
})
