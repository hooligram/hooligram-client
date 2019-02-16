export const API_AUTHORIZATION_SIGN_IN_SUCCESS = 'API:AUTHORIZATION_SIGN_IN_SUCCESS'

export const authorizationSignInRequest = (code, country_code, phone_number) =>
  ({
    type: 'API:AUTHORIZATION_SIGN_IN_REQUEST',
    payload: {
      code,
      country_code,
      phone_number
    }
  })
