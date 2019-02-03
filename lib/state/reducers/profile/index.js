import { combineReducers } from 'redux'
import verification from './verification'
import codeRequest from './code-request'

export default combineReducers({
  verification,
  codeRequest
})
