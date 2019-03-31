import appReducer from 'hg/reducers/app/app'

describe('app reducer', () => {
  let state

  describe('initialization', () => {
    beforeEach(() => {
      state = appReducer(undefined, {})
    })

    it('should return correct initial state', () => {
      expect(state).toEqual(
        {
          isSignedIn: false,
          isStartupDone: false,
          isWebsocketOnline: false
        }
      )
    })

    it('should set isWebsocketOnline to true', () => {
      const nextState = appReducer(state, {
        type: 'WEBSOCKET_OPEN'
      })

      expect(nextState).toEqual(
        {
          isSignedIn: false,
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
        type: 'WEBSOCKET_CLOSE'
      })

      expect(nextState).toEqual(
        {
          isWebsocketOnline: false
        }
      )
    })
  })
})
