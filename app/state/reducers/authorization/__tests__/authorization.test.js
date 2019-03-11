import authorizationReducer from 'hg/state/reducers/authorization/authorization'
import { initialState } from 'hg/state/reducers/authorization/authorization'

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
        payload: {
          code: 'some code',
          phone_number: 'some phone number',
          country_code: 'some country code'
        }
      }
      state = {
        ...initialState
      }
    })

    it('should update token, phone_number & country_code from payload', () => {
      const nextState = authorizationReducer(state, action)

      expect(nextState).toEqual({
        token: 'some code',
        phone_number: 'some phone number',
        country_code: 'some country code'
      })
    })
  })

  describe('state is loaded from storage', () => {
    let action, state
    beforeEach(() => {
      action = {
        type: 'PERSISTENCE_LOAD_STATE_SUCCESS',
        payload: {
          state: {
            authorization: {
              token: 'some code',
              country_code: 'some country code',
              phone_number: 'some phone number'
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
