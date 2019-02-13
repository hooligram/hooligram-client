import profileInfoReducer from '@state/reducers/profile/info'

describe('profile info reducer', () => {
  describe('initially', () => {
    const state = undefined
    const action = {}

    const nextState = profileInfoReducer(state, action)

    it('should return correct initial state', () => {
      expect(nextState).toEqual({
        isSaved: false,
        isSaving: false,
        userName: ''
      })
    })
  })

  describe('user saves user name', () => {
    const state = {
      isSaved: false,
      isSaving: false,
      userName: 'fujiwara-'
    }
    const action = {
      type: 'SAVE_USER_NAME',
      payload: {
        userName: 'fujiwara-no-sai'
      }      
    }

    const nextState = profileInfoReducer(state, action)

    it('should update username', () => {
      expect(nextState.userName).toEqual(action.payload.userName)
    })

    it('should not change other part of the state', () => {
      expect(nextState.isSaved).toEqual(state.isSaved)
      expect(nextState.isSaving).toEqual(state.isSaving)
    })
  })

  describe('state is being persisted', () => {
    const state = {
      isSaved: false,
      isSaving: false,
      userName: 'hikaru-shindou'
    }
    const action = {
      type: 'PERSISTENCE:SAVE_STATE_REQUEST',
      payload: {}
    }

    const nextState = profileInfoReducer(state, action)

    it('should start saving status', () => {
      expect(nextState.isSaving).toEqual(true)
    })
  })

  describe('state has been persisted', () => {
    const state = {
      isSaved: false,
      isSaving: true,
      userName: 'hikaru-shindou'
    }
    const action = {
      type: 'PERSISTENCE:SAVE_STATE_SUCCESS',
      payload: {}
    }

    const nextState = profileInfoReducer(state, action)

    it('should stop saving status', () => {
      expect(nextState.isSaving).toEqual(false)
    })

    it('should update saved status', () => {
      expect(nextState.isSaved).toEqual(true)
    })
  })

  describe('state failed to be persisted', () => {
    const state = {
      isSaved: false,
      isSaving: true,
      userName: 'hikaru-shindou'
    }
    const action = {
      type: 'PERSISTENCE:SAVE_STATE_FAILURE',
      payload: {}
    }

    const nextState = profileInfoReducer(state, action)

    it('should stop saving status', () => {
      expect(nextState.isSaving).toEqual(false)
    })

    it('should update saved status', () => {
      expect(nextState.isSaved).toEqual(false)
    })
  })

  describe('loaded state from storage', () => {
    const state = {}
    const action = {
      type: 'PERSISTENCE:LOAD_STATE_SUCCESS',
      payload: {
        state: {
          profile: {
            info: {
              isSaved: 'is saved boolean',
              isSaving: 'is saving boolean',
              userName: 'akira-toya'
            }
          }
        }
      }
    }

    const nextState = profileInfoReducer(state, action)

    it('should copy profile info state from storage', () => {
      expect(nextState).toEqual(action.payload.state.profile.info)
    })
  })
})
