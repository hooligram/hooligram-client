import { SET_USER_NAME } from 'hg/actions'

const initialState = {
  userName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME: {
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
