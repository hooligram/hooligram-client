import messagesReducer from 'hg/reducers/messages/messages'

describe('messages reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const state = undefined
      const action = {}

      const nextState = messagesReducer(state, action)

      expect(nextState).toEqual({
        byId: {},
        allIds: []
      })
    })
  })
})
