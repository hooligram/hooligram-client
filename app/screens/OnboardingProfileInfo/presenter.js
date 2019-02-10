import { connect as _connect } from 'react-redux'

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
      dispatch({
        type: 'FORMS:SET_USERNAME_INPUT',
        payload: {
          userNameInput 
        }
      })
    }
  }
} 

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
