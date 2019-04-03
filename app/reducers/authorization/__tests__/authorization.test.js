import authorizationReducer, { initialState } from 'hg/reducers/authorization/authorization'

describe('authorization reducer', () => {
  describe('initially', () => {
    let state, action

    beforeEach(() => {
      state = undefined
      action = {}
    })

    it('should return correct initial state', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState).toEqual(initialState)
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
        ...initialState
      }
    })

    it('should not update token, phone_number & country_code from payload', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState).toEqual({
        country_code: '',
        phone_number: '',
        token: ''
      })
    })
  })
})
