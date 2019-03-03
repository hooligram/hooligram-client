import { connect as _connect } from 'react-redux'
import { requestVerificationCode } from 'hg/state/actions/authorization'

export const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onPressNext: (countryCode, phoneNumber, keyboard) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
      keyboard.dismiss()
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
