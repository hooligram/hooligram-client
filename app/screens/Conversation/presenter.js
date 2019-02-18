import { connect as _connect } from 'react-redux'
import { authorizationSignInRequest } from '@state/actions/authorization'
import selectors from '@state/selectors'

// debug
const mockState = {
  messages: {
    byId: {
      id1: {
        id: 'id1',
        message: 'Hello, world!',
        sender: {
          country_code: '1',
          phone_number: '6478637073'
        }
      },
      id2: {
        id: 'id2',
        message: 'Hola',
        sender: {
          country_code: '60',
          phone_number: '199848974'
        }
      },
      id3: {
        id: 'id3',
        message: 'Hooligram is the next chat app!',
        sender: {
          country_code: '65',
          phone_number: '87503118'
        }
      },
      id4: {
        id: 'id4',
        message: 'A very long text message asdfasdklfjkasldjfkljsadklf '
        + 'asldjfklsadjflasdj asdfjlaskdlfjasdlkf lasjdlfjasdklfj '
        + 'asldfklasdjflkasdjlfj klasdf;qweofiwfon',
        sender: {
          country_code: '1',
          phone_number: '6478637073'
        }
      },
    },
    allIds: ['id1', 'id2', 'id3', 'id4']
  }
}

export const mapStateToProps = state => {
  const {
    profile: {
      info: {
        userName
      }
    }
  } = state

  const isAuthorized = selectors.isAuthorized(state)
  const country_code = selectors.currentUserCountryCode(state)
  const phone_number = selectors.currentUserPhoneNumber(state)
  const code = selectors.currentUserCode(state)
  // const messages = selectors.messages(state)
  const messages = selectors.messages(mockState)
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
          && sender.country_code === country_code
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
