import { connect } from 'react-redux'
import { requestVerificationCode } from 'hg/actions'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    requestVerificationCode: (actionId, countryCode, phoneNumber) => {
      dispatch(requestVerificationCode(actionId, countryCode, phoneNumber))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
