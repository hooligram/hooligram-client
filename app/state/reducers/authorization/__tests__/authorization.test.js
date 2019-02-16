import authorizationReducer from '@state/reducers/authorization/authorization'

describe('authorization reducer', () => {
  describe('initially', () => {
    let state, action
    beforeEach(() => {
      state = undefined
      action = {}
    })

    it('should return correct initial state', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState).toEqual({
        token: {}
      })
    })
  })

  describe('user successfully signed in', () => {
    let action, state
    beforeEach(() => {
      action = {
        type: 'API:AUTHORIZATION_SIGN_IN_SUCCESS',
        payload: {
          code: 'some code',
          phone_number: 'some phone number',
          country_code: 'some country code'
        }
      }
      state = {
        token: {}
      }
    })

    it('should update token from payload', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState.token).toEqual({
        code: 'some code',
        phone_number: 'some phone number',
        country_code: 'some country code'
      })
    })
  })
})
