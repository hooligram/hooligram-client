import profileVerificationReducer from '@state/reducers/profile/verification'

describe('`profile.verification` reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const action = {}
      const state = undefined
  
      const nextState = profileVerificationReducer(state, action)
  
      expect(nextState).toEqual({
        isLoading: false,
        isVerified: false
      })
    })
  })

  describe('on action `API:VERIFICATION_SUBMIT_CODE_REQUEST`', () => {
    const state = {
      isLoading: false,
      isVerified: false
    }
    const action = {
      type: 'API:VERIFICATION_SUBMIT_CODE_REQUEST',
      payload: { 
        somePayload: 'somePayload' 
      }
    }

    const nextState = profileVerificationReducer(state, action)

    it('should be loading', () => {
      expect(nextState.isLoading).toBe(true)
    })

    it('should deep copy previous state', () => {
      expect(nextState === state).toBe(false)
    })
  })

  describe('verification code submission successful', () => {
    const state = {
      isLoading: true,
      isVerified: false
    }
    const action = {
      type: 'API:VERIFICATION_SUBMIT_CODE_SUCCESS',
      payload: {}
    }

    const nextState = profileVerificationReducer(state, action)

    it('should verify profile', () => {
      expect(nextState.isVerified).toBe(true)
    })

    it('should stop loading', () => {
      expect(nextState.isLoading).toBe(false)
    })
  })

  describe('verification code submission failed', () => {
    const action = {
      type: 'API:VERIFICATION_SUBMIT_CODE_FAILURE',
      payload: {}
    }

    describe('profile has not been verified`', () => {
      const state = {
        isLoading: true,
        isVerified: false
      }

      const nextState = profileVerificationReducer(state, action)

      it('should stop loading', () => {
        expect(nextState.isLoading).toBe(false)
      })

      it('should not verify profile', () => {
        expect(nextState.isVerified).toBe(false)
      })
    })

    describe('profile has already been verified', () => {
      const state = {
        isLoading: true,
        isVerified: true
      }

      const nextState = profileVerificationReducer(state, action)

      it('should stop loading', () => {
        expect(nextState.isLoading).toBe(false)
      })

      it('should not un-verify profile', () => {
        expect(nextState.isVerified).toBe(true)
      })
    })
  })

  describe('on action `PERSISTENCE:LOAD_STATE_SUCCESS`', () => {
    it('should copy profile verification state from storage', () => {
      const state = {
        isLoading: false,
        isVerified: false
      }
      const stateFromStorage = {
        profile: {
          verification: {
            isLoading: 'isLoading',
            isVerified: 'isVerified'
          }
        }
      }
      const action = {
        type: 'PERSISTENCE:LOAD_STATE_SUCCESS',
        payload: {
          state: stateFromStorage
        }
      }

      const nextState = profileVerificationReducer(state, action)

      expect(nextState).toEqual({
        isLoading: 'isLoading',
        isVerified: 'isVerified'
      })
    })
  })
})
