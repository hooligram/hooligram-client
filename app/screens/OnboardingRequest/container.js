import { connect } from 'react-redux'
import { requestVerificationCode } from 'hg/actions/authorization'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    onPressNext: (countryCode, phoneNumber, keyboard) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
      keyboard.dismiss()
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
