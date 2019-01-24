export const SET_CURRENT_MESSAGE = 'SET_CURRENT_MESSAGE'

export const setCurrentMessage = (message) => {
  return {
    type: SET_CURRENT_MESSAGE,
    payload: {
      message
    }
  }
}
