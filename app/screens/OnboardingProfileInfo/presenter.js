import { connect as _connect } from 'react-redux'
import { setUserNameInput } from '@state/actions/forms'

const mapStateToProps = (state) => {
  const {
    forms: {
      userNameInput
    }
  } = state

  return {
    userNameInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserName: () => {
      dispatch({
        type: 'PERSISTENCE:USERNAME_SAVE_SUCCESS',
        payload: {}
      })
    },
    setUserNameInput: (userNameInput) => {
      if (!userNameInput) {
        return
      }
      dispatch(setUserNameInput(userNameInput))
    }
  }
} 

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
