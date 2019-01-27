import formsReducer from '@state/reducers/forms/forms'

describe('forms reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const action = {}

      const nextState = formsReducer(undefined, action)

      expect(nextState).toEqual({
        currentMessage: ''
      })
    })
  })

  describe('action is `SEND_MESSAGE`', () => {
    it('should clear `currentMessage`', () => {
      const action = { type: 'SEND_MESSAGE' }
      const state = { currentMessage: 'Some message' }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({
        currentMessage: ''
      })
    })
  })

  describe('action is `SET_CURRENT_MESSAGE`', () => {
    it('should set `currentMessage` from action payload', () => {
      const state = { currentMessage: 'Hell' }
      const action = {
        type: 'SET_CURRENT_MESSAGE',
        payload: {
          message: 'Hello'
        }
      }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({
        currentMessage: 'Hello'
      })
    })
  })
})
