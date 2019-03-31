import { connect as _connect } from 'react-redux'
import { authorizationSignInRequest } from 'hg/actions/authorization'
import { broadcastMessageRequest } from 'hg/actions/messaging'
import selectors from 'hg/selectors'

export const mapStateToProps = state => {
  const {
    profile: {
      userName
    }
  } = state

  const isAuthorized = selectors.isAuthorized(state)
  const country_code = selectors.currentUserCountryCode(state)
  const phone_number = selectors.currentUserPhoneNumber(state)
  const code = selectors.currentUserCode(state)
  const messages = selectors.messages(state)
    .map(({ message, sender }) => ({
      message,
      sender: (
        sender != undefined
        ? `+${sender.country_code} ${sender.phone_number}`
        : undefined
      ),
      isCurrentUser: (
        (
          sender != undefined
          && sender.country_code === country_code
          && sender.phone_number === phone_number
        )
        ? true
        : false
      )
    }))

  return {
    isAuthorized,
    code,
    country_code,
    messages,
    phone_number,
    userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (country_code, phone_number) => (message) => {
      dispatch(
        broadcastMessageRequest(
          message,
          country_code,
          phone_number
        )
      )
    },
    signIn: (countryCode, phoneNumber, verificationCode) => {
      dispatch(authorizationSignInRequest(countryCode, phoneNumber, verificationCode))
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
    ...stateProps,
    ...dispatchProps,
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
