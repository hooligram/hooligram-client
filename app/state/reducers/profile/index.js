import { SAVE_USER_NAME } from '@state/actions'

const initialState = {
  userName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_NAME: {
      const {
        payload: {
          userName
        }
      } = action
      return {
        ...state,
        userName
      }
    }

    default: {
      return state
    }
  }
}
