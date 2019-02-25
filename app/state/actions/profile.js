import {
  SAVE_USER_NAME,
  VERIFICATION_REQUEST_CODE_REQUEST,
  VERIFICATION_SUBMIT_CODE_REQUEST
} from '@state/actions'

export const submitVerificationCode = (code) => {
  return {
    type: VERIFICATION_SUBMIT_CODE_REQUEST,
    payload: {
      code
    }
  }
}

export const saveUserName = (userName) => {
  return {
    type: SAVE_USER_NAME,
    payload: {
      userName
    }
  }
}
