import { connect } from 'react-redux'
import {
  requestVerificationCode,
  submitVerificationCode
} from 'hg/actions/authorization'
import component from './component'

export const mapDispatchToProps = (dispatch) => {
  return {
    requestVerificationCode: (actionId, countryCode, phoneNumber) => {
      dispatch(requestVerificationCode(actionId, countryCode, phoneNumber))
    },

    submitVerificationCode: (actionId, verificationCode) => {
      dispatch(submitVerificationCode(actionId, verificationCode))
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    countryCode: state.authorization.country_code,
    phoneNumber: state.authorization.phone_number
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
