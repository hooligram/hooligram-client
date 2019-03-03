import websocket from 'hg/state/middlewares/websocket/websocket'

describe('websocket', () => {
  const config = {
    host: 'ws://somehost'
  }
  const store = { dispatch: jest.fn() }
  const api = websocket(config)(store)

  describe('onopen', () => {
    it('should dispatch `WEBSOCKET:INIT_SUCCESS`', () => {
      api.onopen()

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'WEBSOCKET:INIT_SUCCESS',
        payload: {
          host: config.host
        }
      })
    })
  })

  describe('onmessage', () => {
    describe('event contains JSON-parseable data', () => {
      it('should dispatch parsed data as an action', () => {
        const event = {
          data: `
            {
              "type":"SOME_ACTION_TYPE",
              "payload": {
                "someData": "someData"
              }
            }
          `
        }

        api.onmessage(event)

        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'API:SOME_ACTION_TYPE',
          payload: {
            someData: 'someData'
          }
        })
      })
    })

    describe('event contains non JSON-parseable data', () => {
      let _parse

      beforeAll(() => {
        _parse = JSON.parse
        JSON.parse = () => {
          throw Error('Some error')
        }
      })

      afterAll(() => {
        JSON.parse = _parse
      })

      it('should dispatch `WEBSOCKET:ERROR` with err in payload', () => {
        const event = {
          data: `
            {
              "type": "SOME_ACTION_TYPE",
              "brokenJson": {{
            }
          `
        }

        api.onmessage(event)

        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'WEBSOCKET:ERROR',
          payload: {
            err: Error('Some error')
          }
        })
      })
    })
  })

  describe('onerror', () => {
    it('should dispatch `WEBSOCKET:ERROR` with informative err in payload', () => {
      const event = {
        someEventData: 'someEventData'
      }

      api.onerror(event)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'WEBSOCKET:ERROR',
        payload: {
          err: new Error(`WebSocketError: ${event}`)
        }
      })
    })
  })

  describe('onclose', () => {
    it('should dispatch `WEBSOCKET:CLOSE` action with reason and code', () => {
      const reason = 'Some reason'
      const code = 123
      const event = {
        reason,
        code
      }

      api.onclose(event)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'WEBSOCKET:CLOSE',
        payload: {
          reason,
          code
        }
      })
    })
  })
})
