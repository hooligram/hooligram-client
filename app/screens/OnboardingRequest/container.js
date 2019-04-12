import { connect } from 'react-redux'
import { requestVerificationCode } from 'hg/actions/authorization'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    requestVerificationCode: (countryCode, phoneNumber) => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
