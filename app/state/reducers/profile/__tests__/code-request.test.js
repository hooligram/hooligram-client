import profileCodeRequestReducer from '@state/reducers/profile/code-request'

describe('`profile.codeRequest` reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const action = {}
      const state = undefined

      const nextState = profileCodeRequestReducer(state, action)

      expect(nextState).toEqual({
        isLoading: false,
        isLoaded: false,
        isSuccess: false,
        code: '',
        country_code: '',
        phone_number: ''
      })
    })
  })

  describe('on action `API:VERIFICATION_REQUEST_CODE_REQUEST`', () => {
    const action = {
      type: 'API:VERIFICATION_REQUEST_CODE_REQUEST',
      payload: {
        country_code: 'some country code',
        phone_number: 'some phone number'
      }
    }
    const state = {
      isLoading: false,
      isLoaded: false,
      isSuccess: false,
      code: '',
      country_code: '',
      phone_number: ''
    }

    const nextState = profileCodeRequestReducer(state, action)

    it('should be loading', () => {
      expect(nextState.isLoading).toBe(true)
      expect(nextState.isLoaded).toBe(false)
    })

    it('should update `country_code` and `phone_number`', () => {
      expect(nextState.country_code).toEqual(action.payload.country_code)
      expect(nextState.phone_number).toEqual(action.payload.phone_number)
    })

    it('should deep copy remaining state', () => {
      expect(nextState.isSuccess).toEqual(state.isSuccess)
    })
  })

  describe('verification code request successful', () => {
    const action = {
      type: 'API:VERIFICATION_REQUEST_CODE_SUCCESS',
      payload: {}
    }
    const state = {
      code: 'some code',
      country_code: 'some country code',
      phone_number: 'some phone number',
      isLoading: true,
      isLoaded: false,
      isSuccess: false
    }

    const nextState = profileCodeRequestReducer(state, action)

    it('should stop loading', () => {
      expect(nextState.isLoading).toBe(false)
      expect(nextState.isLoaded).toBe(true)
    })

    it('should mark as success', () => {
      expect(nextState.isSuccess).toBe(true)
    })

    it('should maintain remaining state the same', () => {
      const remainingPrevState = { ...state }
      const remainingNextState = { ...nextState }

      delete remainingPrevState.isLoaded
      delete remainingPrevState.isLoading
      delete remainingPrevState.isSuccess
      delete remainingNextState.isLoaded
      delete remainingNextState.isLoading
      delete remainingNextState.isSuccess

      expect(remainingNextState).toEqual(remainingPrevState)
    })
  })

  describe('verification code request failure', () => {
    const action = {
      type: 'API:VERIFICATION_REQUEST_CODE_FAILURE',
      payload: {}
    }

    describe('`isSuccess` is false', () => {
      const state = {
        code: 'some code',
        country_code: 'some country code',
        phone_number: 'some phone number',
        isLoading: true,
        isLoaded: false,
        isSuccess: false
      }
  
      const nextState = profileCodeRequestReducer(state, action)
  
      it('should stop loading', () => {
        expect(nextState.isLoading).toBe(false)
        expect(nextState.isLoaded).toBe(true)
      })
  
      it('should mark as not success', () => {
        expect(nextState.isSuccess).toBe(false)
      })

      it('should maintain remaining state the same', () => {
        const remainingPrevState = { ...state }
        const remainingNextState = { ...nextState }

        delete remainingPrevState.isLoaded
        delete remainingPrevState.isLoading
        delete remainingPrevState.isSuccess
        delete remainingNextState.isLoaded
        delete remainingNextState.isLoading
        delete remainingNextState.isSuccess

        expect(remainingNextState).toEqual(remainingPrevState)
      })
    })

    describe('`isSuccess` is true', () => {
      const state = {
        isLoading: true,
        isLoaded: false,
        isSuccess: true
      }
  
      const nextState = profileCodeRequestReducer(state, action)
  
      it('should stop loading', () => {
        expect(nextState.isLoading).toBe(false)
        expect(nextState.isLoaded).toBe(true)
      })
  
      it('should mark as not success', () => {
        expect(nextState.isSuccess).toBe(false)
      })
    })
  })

  describe('on action `PERSISTENCE:LOAD_STATE_SUCCESS`', () => {
    it('should copy profile code-request state from storage', () => {
      const state = {
        isLoaded: false,
        isLoading: false,
        isSuccess: false
      }
      const stateFromStorage = {
        profile: {
          codeRequest: {
            isLoaded: 'isLoaded',
            isLoading: 'isLoading',
            isSuccess: 'isSuccess'
          }
        }
      }
      const action = {
        type: 'PERSISTENCE:LOAD_STATE_SUCCESS',
        payload: {
          state: stateFromStorage
        }
      }

      const nextState = profileCodeRequestReducer(state, action)

      expect(nextState).toEqual({
        isLoaded: 'isLoaded',
        isLoading: 'isLoading',
        isSuccess: 'isSuccess'
      })
    })
  })

  describe('submits verification code', () => {
    const action = {
      type: 'API:VERIFICATION_SUBMIT_CODE_REQUEST',
      payload: {
        code: 'some code'
      }
    }

    it('should update the verification code', () => {
      const state = {
        code: ''
      }

      const nextState = profileCodeRequestReducer(state, action)

      expect(nextState.code).toEqual(action.payload.code)
    })
  })
})
