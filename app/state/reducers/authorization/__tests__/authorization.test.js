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

  describe('state is loaded from storage', () => {
    let action, state
    beforeEach(() => {
      action = {
        type: 'PERSISTENCE:LOAD_STATE_SUCCESS',
        payload: {
          state: {
            authorization: {
              token: {
                code: 'some code',
                country_code: 'some country code',
                phone_number: 'some phone number'
              }
            }
          }
        }
      }
      state = undefined
    })

    it('should copy state', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState.verification).toEqual(action.payload.state.verification)
    })
  })
})
