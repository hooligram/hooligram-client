import { SAVE_USER_NAME } from '@state/actions/profile'

const initialState = {
  userName: ''
}

const info = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_NAME: {
      const {
        payload: {
          userName
        }
      } = action

      return {
        userName
      }
    }
    default:
      return state
  }
}

export default info
