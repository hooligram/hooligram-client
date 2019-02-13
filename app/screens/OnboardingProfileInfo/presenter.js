import { connect as _connect } from 'react-redux'
import { setUserNameInput } from '@state/actions/forms'
import { saveUserName } from '@state/actions/profile'

const mapStateToProps = (state) => {
  const {
    forms: {
      userNameInput
    },
    profile: {
      info: {
        isSaving
      }
    }
  } = state

  return {
    userNameInput,
    isSavingUserName: isSaving
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserName: (userNameInput) => () => {
      dispatch(saveUserName(userNameInput))
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
