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

  describe('new message successfully received', () => {
    let state, action
    beforeEach(() => {
      state = {
        byId: {
          id1: {
            id: 'id1',
            message: 'some message',
            sender: 'some sender'
          },
          id2: {
            id: 'id2',
            message: 'some other message',
            sender: 'some other sender'
          },
        },
        allIds: ['id1', 'id2']
      }
      action = {
        type: 'MESSAGING_BROADCAST_SUCCESS',
        payload: {
          message: 'some new message',
          sender: {
            country_code: 'some country code',
            phone_number: 'some phone number'
          }
        }
      }
    })

    it('should update state with new message', () => {
      const nextState = messagesReducer(state, action)

      expect(Object.keys(nextState.byId).length).toEqual(
        Object.keys(state.byId).length + 1
      )
      expect(nextState.allIds.length).toEqual(state.allIds.length + 1)
    })
  })
})
