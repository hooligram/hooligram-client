import apiMiddleware, { ws } from 'hg/state/middlewares/websocket/middleware'

xdescribe('api middleware', () => {
  let getOrCreateWsClient, store, next, callApiMiddleware
  beforeEach(() => {
    ws.sendMessage = jest.fn()
    getOrCreateWsClient = jest.fn()
    store = {
      dispatch: jest.fn(),
      getState: jest.fn()
    }
    next = jest.fn()
    callApiMiddleware = apiMiddleware(getOrCreateWsClient)(store)(next)
  })

  describe('app just starts up', () => {
    const action = {
      type: 'APP_STARTUP',
      payload: {}
    }

    it('should initiate connection to websocket', () => {
      callApiMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'WEBSOCKET:INIT_REQUEST',
        payload: {}
      })
      expect(getOrCreateWsClient).toHaveBeenCalled()
    })

    it('should update state before initiating websocket connection', () => {
      callApiMiddleware(action)

      expect(next).toHaveBeenCalledBefore(store.dispatch)
    })
  })

  describe('action is not an api request', () => {
    const action = {
      payload: {
        somePayload: 'some payload'
      }
    }

    it('should not send message over websocket', () => {
      [
        'SOME_ACTION_SUCCESS',
        'SOME_ACTION_FAILURE',
        'SOMETHING:NON_API',
        'SOME_ACTION',
        'SOME_SERVICE:SOME_ACTION_REQUEST'
      ]
      .forEach(actionType => {
        action.type = actionType

        callApiMiddleware(action)

        expect(ws.sendMessage).not.toHaveBeenCalled()
      })
    })
  })

  describe('action is an api request', () => {
    const action = {
      payload: {
        somePayload: 'some payload'
      }
    }

    it('should send message over websocket', () => {
      [
        'SOME_ACTION_REQUEST'
      ]
      .forEach(actionType => {
        action.type = actionType

        callApiMiddleware(action)

        expect(ws.sendMessage).toHaveBeenCalled()
      })
    })
  })
})
