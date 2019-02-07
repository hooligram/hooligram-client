import persistenceMiddleware from '@state/middlewares/persistence/persistence'

describe('persistence middleware', () => {
  let store, next, callPersistenceMiddleware, persistenceApi, stateFromStorage, stateFromStore
  beforeEach(() => {
    stateFromStorage = {
      someMockData: 'someMockData'
    }
    persistenceApi = {
      getState: jest.fn(() => 
        new Promise(resolve => 
          resolve(stateFromStorage)
        )
      ),
      saveState: jest.fn()
    }
    store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => stateFromStore)
    }
    next = jest.fn()
    callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
  })

  describe('on app init action `INIT`', () => {
    const action = {
      type: 'INIT',
      payload: {}
    }

    it('should dispatch `STORAGE:LOAD_STATE` with payload from storage', async () => {
      await callPersistenceMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'STORAGE:LOAD_STATE',
        payload: {
          state: stateFromStorage
        }
      })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })

    it('should not dispatch any new action if state from storage is `undefined`', async () => {
      persistenceApi.getState = jest.fn(() => undefined)

      await callPersistenceMiddleware(action)

      expect(store.dispatch).not.toHaveBeenCalled()
    })

    it('should not dispatch any new action if state from storage is `null`', async () => {
      persistenceApi.getState = jest.fn(() => null)

      await callPersistenceMiddleware(action)

      expect(store.dispatch).not.toHaveBeenCalled()
    })

    describe('PersistenceApi getState fails', () => {
      let error
      beforeEach(() => {
        error = { someErrorObject: 'some error data' }
        persistenceApi.getState = jest.fn(() => 
          new Promise((_, reject) => 
            reject(error)
          )
        )
        callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
      })

      it('should dispatch `STORAGE:LOAD_STATE_FAILURE` with error as payload', async () => {
        await callPersistenceMiddleware(action)

        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'STORAGE:LOAD_STATE_FAILURE',
          payload: {
            error
          }
        })
      })
    })
  })

  describe('any action', () => {
    const action = {
      type: 'SOME_ACTION',
      payload: {
        somePayload: 'some payload'
      }
    }

    it('should call `next` properly', async () => {
      await callPersistenceMiddleware(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(next).toHaveBeenCalledTimes(1)
    })

    it('should propagate returned action by next to store', async () => {
      const expectedAction = {
        type: 'SOME_ACTION_RETURNED_BY_NEXT',
        payload: {}
      }
      next = jest.fn(() => expectedAction)
      callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)

      const returnedAction = await callPersistenceMiddleware(action)

      expect(returnedAction).toEqual(expectedAction)
    })

    it('should update storage', async () => {
      await callPersistenceMiddleware(action)

      expect(persistenceApi.saveState).toHaveBeenCalledWith(stateFromStore)
      expect(persistenceApi.saveState).toHaveBeenCalledTimes(1)
    })

    describe('PersistenceApi saveState fails', () => {
      let error
      beforeEach(() => {
        error = { someErrorObject: 'some error data' }
        persistenceApi.saveState = jest.fn(() => 
          new Promise((_, reject) => 
            reject(error)
          )
        )
        callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
      })

      it('should dispatch `STORAGE:SAVE_STATE_FAILURE` with error as payload', async () => {
        await callPersistenceMiddleware(action)

        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'STORAGE:SAVE_STATE_FAILURE',
          payload: {
            error
          }
        })
      })
    })
  })
})
