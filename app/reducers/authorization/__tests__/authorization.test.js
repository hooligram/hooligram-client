import authorizationReducer from 'hg/reducers/authorization'
import authorizationInit from 'hg/reducers/authorization/init'

describe('authorization reducer', () => {
  describe('initially', () => {
    let state, action

    beforeEach(() => {
      state = undefined
      action = {}
    })

    it('should return correct initial state', () => {
      const nextState = authorizationReducer(state, action)
      expect(nextState).toEqual(authorizationInit)
    })
  })

  describe('user successfully signed in', () => {
    let action, state
    beforeEach(() => {
      action = {
        type: 'AUTHORIZATION_SIGN_IN_SUCCESS',
        payload: {}
      }
      state = {
        ...authorizationInit
      }
    })

    it('should not update country_code, phone_number & verification_code from payload', () => {
      const nextState = authorizationReducer(state, action)
      expect(nextState).toEqual({
        country_code: '',
        phone_number: '',
        verification_code: ''
      })
    })
  })
})
