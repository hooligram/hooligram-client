import {
  SET_USER_NAME
} from 'hg/actions'

export const saveUserName = (userName) => {
  return {
    type: SET_USER_NAME,
    payload: {
      userName
    }
  }
}
