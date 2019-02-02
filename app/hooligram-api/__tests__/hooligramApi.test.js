import hooligramApi from '../hooligramApi'

describe('hooligramApi', () => {
  const config = {
    host: 'ws://somehost'
  }
  const store = { dispatch: jest.fn() }
  const api = hooligramApi(config)(store)

  describe('onopen', () => {
    it('should dispatch `API_INIT`', () => {
      api.onopen()

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'API_INIT',
        payload: {}
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
          type: 'SOME_ACTION_TYPE',
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

      it('should dispatch `API_ERROR` with err in payload', () => {
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
          type: 'API_ERROR',
          payload: {
            err: Error('Some error')
          }
        })
      })
    })
  })

  describe('onerror', () => {
    it('should dispatch `API_ERROR` with informative err in payload', () => {
      const event = {
        someEventData: 'someEventData'
      }

      api.onerror(event)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'API_ERROR',
        payload: {
          err: new Error(`WebSocketError: ${event}`)
        }
      })
    })
  })

  describe('onclose', () => {
    it('should dispatch `API_CLOSE` action with reason and code', () => {
      const reason = 'Some reason'
      const code = 123
      const event = {
        reason,
        code
      }

      api.onclose(event)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'API_CLOSE',
        payload: {
          reason,
          code
        }
      })
    })
  })
})
