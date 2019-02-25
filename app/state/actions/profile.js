import {
  SAVE_USER_NAME
} from '@state/actions'

export const saveUserName = (userName) => {
  return {
    type: SAVE_USER_NAME,
    payload: {
      userName
    }
  }
}
