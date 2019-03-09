import appReducer from 'hg/state/reducers/app/app'

describe('app reducer', () => {
  let state

  describe('initialization', () => {
    beforeEach(() => {
      state = appReducer(undefined, {})
    })

    it('should return correct initial state', () => {
      expect(state).toEqual(
        {
          isStartupDone: false,
          isWebsocketOnline: false
        }
      )
    })

    it('should set isWebsocketOnline to true', () => {
      const nextState = appReducer(state, {
        type: 'WEBSOCKET:INIT_SUCCESS'
      })

      expect(nextState).toEqual(
        {
          isStartupDone: false,
          isWebsocketOnline: true
        }
      )
    })
  })

  describe('websocket is online', () => {
    beforeEach(() => {
      state = {
        isWebsocketOnline: true
      }
    })

    it('should set isWebsocketOnline to false', () => {
      const nextState = appReducer(state, {
        type: 'WEBSOCKET:CLOSE'
      })

      expect(nextState).toEqual(
        {
          isWebsocketOnline: false
        }
      )
    })
  })
})
