import persistenceMiddleware from '@state/middlewares/persistence/persistence'

describe('persistence middleware', () => {
  let store, next, callPersistenceMiddleware, persistenceApi, stateFromStorage
  beforeEach(() => {
    stateFromStorage = {
      someMockData: 'someMockData'
    }
    persistenceApi = {
      getState: jest.fn(() => stateFromStorage)
    }
    store = {
      dispatch: jest.fn(),
      getState: jest.fn()
    }
    next = jest.fn()
    callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
  })

  describe('app init', () => {
    it('should dispatch `STORAGE:LOAD_STATE` with payload from storage', () => {
      const action = {
        type: 'INIT',
        payload: {}
      }

      callPersistenceMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'STORAGE:LOAD_STATE',
        payload: {
          state: stateFromStorage
        }
      })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
