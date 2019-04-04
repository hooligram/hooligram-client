import { connect } from 'react-redux'
import {
  requestVerificationCode,
  submitVerificationCode
} from 'hg/actions/authorization'
import component from './component'

export const mapDispatchToProps = dispatch => {
  return {
    resendVerificationCode: (countryCode, phoneNumber) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
    },

    submitVerificationCode: (verificationCode) => () => {
      dispatch(submitVerificationCode(verificationCode))
    }
  }
}

export const mapStateToProps = state => {
  const {
    authorization: {
      country_code,
      phone_number
    }
  } = state

  return {
    countryCode: country_code,
    phoneNumber: phone_number
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
