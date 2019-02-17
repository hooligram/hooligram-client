import { connect as _connect } from 'react-redux'
import { authorizationSignInRequest } from '@state/actions/authorization'
import selectors from '@state/selectors'

export const mapStateToProps = state => {
  const {
    profile: {
      info: {
        userName
      },
      codeRequest: {
        code,
        country_code,
        phone_number
      }
    }
  } = state

  const isAuthorized = selectors.isAuthorized(state)

  return {
    isAuthorized,
    userName,
    code,
    country_code,
    phone_number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (code, country_code, phone_number) => {
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
