import { connect as _connect } from 'react-redux'
import { broadcastMessageRequest } from '@state/actions/messaging'
import selectors from '@state/selectors'

const mapStateToProps = (state) => ({
  country_code: selectors.currentUserCountryCode(state),
  phone_number: selectors.currentUserPhoneNumber(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (country_code, phone_number) => (message) => () => {
      dispatch(
        broadcastMessageRequest(
          message,
          country_code,
          phone_number
        )
      )
    }
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const { sendMessage } = dispatchProps
  const {
    message,
    country_code,
    phone_number
  } = stateProps

  return {
    message,
    sendMessage: sendMessage(
      country_code,
      phone_number
    )
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)
