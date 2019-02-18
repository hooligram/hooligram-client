import { API_AUTHORIZATION_SIGN_IN_REQUEST } from '.'

export const authorizationSignInRequest = (code, country_code, phone_number) =>
  ({
    type: API_AUTHORIZATION_SIGN_IN_REQUEST,
    payload: {
      code,
      country_code,
      phone_number
    }
  })
