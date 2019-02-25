import { connect as _connect } from 'react-redux'
import {
  requestVerificationCode,
  submitVerificationCode
} from '@state/actions/authorization'

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

export const mapDispatchToProps = (dispatch) => {
  return {
    resendSMS: (countryCode, phoneNumber) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
    },
    submitCode: (verificationCode) => () => {
      dispatch(submitVerificationCode(verificationCode))
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
