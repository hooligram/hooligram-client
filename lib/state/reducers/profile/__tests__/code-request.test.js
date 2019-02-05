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
        isSuccess: false
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
      isSuccess: false
    }

    const nextState = profileCodeRequestReducer(state, action)

    it('should be loading', () => {
      expect(nextState.isLoading).toBe(true)
      expect(nextState.isLoaded).toBe(false)
    })

    it('should deep copy remaining state', () => {
      expect(nextState.isSuccess).toEqual(state.isSuccess)
    })
  })

  describe('on action `VERIFICATION_REQUEST_CODE_SUCCESS`', () => {
    const action = {
      type: 'VERIFICATION_REQUEST_CODE_SUCCESS',
      payload: {}
    }
    const state = {
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
  })

  describe('on action `VERIFICATION_REQUEST_CODE_FAILURE`', () => {
    const action = {
      type: 'VERIFICATION_REQUEST_CODE_FAILURE',
      payload: {}
    }

    describe('`isSuccess` is false', () => {
      const state = {
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
})