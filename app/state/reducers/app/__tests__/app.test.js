import appReducer from '@state/reducers/app/app'

describe('app reducer', () => {
  let state

  describe('initialization', () => {
    beforeEach(() => {
      state = appReducer(undefined, {})
    })

    it('should return correct initial state', () => {
      expect(state).toEqual(
        {
          websocketOnline: false
        }
      )
    })

    it('should set websocketOnline to true', () => {
      const nextState = appReducer(state, {
        type: 'WEBSOCKET:INIT_SUCCESS'
      })

      expect(nextState).toEqual(
        {
          websocketOnline: true
        }
      )
    })
  })

  describe('websocket is online', () => {
    beforeEach(() => {
      state = {
        websocketOnline: true
      }
    })

    it('should set websocketOnline to false', () => {
      const nextState = appReducer(state, {
        type: 'WEBSOCKET:CLOSE'
      })

      expect(nextState).toEqual(
        {
          websocketOnline: false
        }
      )
    })
  })
})
