import { connect as _connect } from 'react-redux'
import { authorizationSignInRequest } from '@state/actions/authorization'

export const mapStateToProps = state => {
  const {
    profile: {
      info: {
        userName
      }
    }
  } = state

  return { userName }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (code, country_code, phone_number) => () => {
      dispatch(
        authorizationSignInRequest(
          code,
          country_code,
          phone_number
        )
      )
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
