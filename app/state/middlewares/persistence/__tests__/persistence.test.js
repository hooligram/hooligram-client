import persistenceMiddleware from '@state/middlewares/persistence/persistence'

describe('persistence middleware', () => {
  let store, next, callPersistenceMiddleware, persistenceApi, stateFromStorage
  beforeEach(() => {
    stateFromStorage = {
      someMockData: 'someMockData'
    }
    persistenceApi = {
      getState: jest.fn(() => 
        new Promise(resolve => 
          resolve(stateFromStorage)
        )
      )
    }
    store = {
      dispatch: jest.fn(),
      getState: jest.fn()
    }
    next = jest.fn()
    callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
  })

  describe('app init', () => {
    it('should dispatch `STORAGE:LOAD_STATE` with payload from storage', async () => {
      const action = {
        type: 'INIT',
        payload: {}
      }

      await callPersistenceMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'STORAGE:LOAD_STATE',
        payload: {
          state: stateFromStorage
        }
      })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })

    it('should not dispatch any action if state from storage is `undefined`', () => {
      persistenceApi.getState = jest.fn(() => undefined)
      const action = {
        type: 'INIT',
        payload: {}
      }

      callPersistenceMiddleware(action)

      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })
})
