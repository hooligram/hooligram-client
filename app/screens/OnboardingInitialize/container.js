import { connect } from 'react-redux'
import { authorizationSignInRequest, goToHome } from 'hg/actions'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode
} from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    authorizationSignInRequest: (actionId, countryCode, phoneNumber, verificationCode) => {
      dispatch(authorizationSignInRequest(actionId, countryCode, phoneNumber, verificationCode))
    },

    goToHome: () => {
      dispatch(goToHome())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    countryCode: currentUserCountryCode(state),
    phoneNumber: currentUserPhoneNumber(state),
    verificationCode: currentUserVerificationCode(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
