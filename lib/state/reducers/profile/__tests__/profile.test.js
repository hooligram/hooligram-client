import profileReducer from '@state/reducers/profile/profile'
import profile from '../profile';

describe('`profile` reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const action = {}
      const state = undefined
  
      const nextState = profileReducer(state, action)
  
      expect(nextState).toEqual({
        verification: {
          isLoading: false,
          isVerified: false,
        },
      })
    })
  })

  describe('on action `VERIFICATION_SUBMIT_CODE_REQUEST`', () => {
    const state = {
      verification: {
        isLoading: false,
        isVerified: false
      }
    }
    const action = {
      type: 'VERIFICATION_SUBMIT_CODE_REQUEST',
      payload: { 
        somePayload: 'somePayload' 
      }
    }

    const nextState = profileReducer(state, action)

    it('should be loading', () => {
      expect(nextState.verification.isLoading).toBe(true)
    })

    it('should deep copy previous state', () => {
      expect(nextState === state).toBe(false)
      expect(nextState.verification === state.verification).toBe(false)
    })
  })

  // describe('')
})
