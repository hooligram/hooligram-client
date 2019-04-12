import { connect } from 'react-redux'
import { authorizationSignInRequest } from 'hg/actions/authorization'
import { goToHome } from 'hg/actions/navigation'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode
} from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    authorizationSignInRequest: (countryCode, phoneNumber, verificationCode) => {
      dispatch(authorizationSignInRequest(countryCode, phoneNumber, verificationCode))
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
