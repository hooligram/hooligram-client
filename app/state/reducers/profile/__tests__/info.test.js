import profileInfoReducer from '@state/reducers/profile/info'

describe('profile info reducer', () => {
  describe('initially', () => {
    const state = undefined
    const action = {}

    const nextState = profileInfoReducer(state, action)

    it('should return correct initial state', () => {
      expect(nextState).toEqual({
        userName: ''
      })
    })
  })

  describe('user saves user name', () => {
    const state = {
      userName: ''
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
  })
})
