import profileReducer from 'hg/state/reducers/profile'

describe('profile reducer', () => {
  describe('initial state', () => {
    let state

    beforeEach(() => {
      state = profileReducer(undefined, {})
    })

    it('should have correct inital state', () => {
      expect(state).toEqual({
        userName: ''
      })
    })

    it('should update userName', () => {
      state = profileReducer(state, {
        payload: {
          userName: 'Fujiwara Sai'
        },
        type: 'SAVE_USER_NAME'
      })
      expect(state).toEqual({
        userName: 'Fujiwara Sai'
      })
    })

    it('should not update userName', () => {
      state = profileReducer(state, {
        payload: {
          userName: 'Fujiwara Sai'
        },
        type: 'SAVE_USER_NAME_TYPO'
      })
      expect(state).toEqual({
        userName: ''
      })
    })
  })
})
