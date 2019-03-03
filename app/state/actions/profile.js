import {
  SAVE_USER_NAME
} from 'hg/state/actions'

export const saveUserName = (userName) => {
  return {
    type: SAVE_USER_NAME,
    payload: {
      userName
    }
  }
}
