import persistenceMiddleware from 'hg/state/middlewares/persistence/persistence'

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
      getState: jest.fn(() => ({
        app: {
          isStartupDone: true
        }
      }))
    }
    next = jest.fn()
    callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
  })

  describe('on app startup', () => {
    const action = {
      type: 'APP:STARTUP',
      payload: {}
    }

    it('should try to load state from storage', async () => {
      await callPersistenceMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'PERSISTENCE:LOAD_STATE_REQUEST',
        payload: {}
      })
    })

    it('should update state before loading state from storage', async () => {
      await callPersistenceMiddleware(action)

      expect(next).toHaveBeenCalledBefore(store.dispatch)
    })

    describe('storage returns null or undefined result', () => {
      [undefined, null].forEach(result => {
        beforeEach(() => {
          persistenceApi.getState = jest.fn(() =>
            new Promise(resolve =>
              resolve(result)
            )
          )
        })

        it('should dispatch error with payload', async () => {
          await callPersistenceMiddleware(action)

          expect(store.dispatch({
            type: 'PERSISTENCE:LOAD_STATE_FAILURE',
            payload: {
              error: new Error('Error: state in storage is `undefined` or `null`')
            }
          }))
        })
      })
    })

    describe('storage fails to provide state', () => {
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

      it('should dispatch error with payload', async () => {
        await callPersistenceMiddleware(action)

        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'PERSISTENCE:LOAD_STATE_FAILURE',
          payload: {
            error
          }
        })
      })
    })
  })

  describe('action is a PERSISTENCE:* or not api response action', () => {
    [
      'PERSISTENCE:SOME_ACTION',
      'SOME_ACTION',
      'API:SOME_ACTION_REQUEST'
    ]
    .forEach(async actionType => {
      const action = {
        type: actionType,
        payload: {}
      }
      expectedReturnedAction = { someAction: 'someAction' }
      next = jest.fn(() => expectedReturnedAction)

      const returnedAction = await callPersistenceMiddleware(action)

      it('should not dispatch any action', () => {
        expect(store.dispatch).not.toHaveBeenCalled()
      })

      it('should call propagate the action to next middleware', () => {
        expect(store.next.toHaveBeenCalledWith(action))
        expect(returnedAction).toEqual(returnedAction)
      })
    })
  })

  describe('action is the one of the following', () => {
    [
      'API:AUTHORIZATION_SIGN_IN_SUCCESS'
    ]
    .forEach(async actionType => {
      const action = {
        type: actionType,
        payload: {
          somePayload: 'some payload'
        }
      }

      it('should call `next` properly', async () => {
        await callPersistenceMiddleware(action)

        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
      })

      it('should propagate action to next middleware', async () => {
        const expectedAction = {
          type: 'SOME_ACTION_RETURNED_BY_NEXT',
          payload: {}
        }
        next = jest.fn(() => expectedAction)
        callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)

        const returnedAction = await callPersistenceMiddleware(action)

        expect(returnedAction).toEqual(expectedAction)
      })

      it('should update storage with next state', async () => {
        const prevState = 'prevState'
        const nextState = {
          app: {
            isStartupDone: true
          }
        }
        store.getState = jest
          .fn()
          .mockReturnValueOnce(() => prevState)
          .mockImplementationOnce(() => nextState)
        callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)

        await callPersistenceMiddleware(action)

        expect(store.getState).toHaveBeenCalledTimes(2)
        expect(persistenceApi.saveState).toHaveBeenCalledWith(nextState)
        expect(persistenceApi.saveState).toHaveBeenCalledTimes(1)
      })

      describe('storage fails to save state', () => {
        let error
        beforeEach(() => {
          error = { someErrorData: 'some error data' }
          persistenceApi.saveState = jest.fn(() =>
            new Promise((_, reject) =>
              reject(error)
            )
          )
          callPersistenceMiddleware = persistenceMiddleware(persistenceApi)(store)(next)
        })

        it('should dispatch error action with payload', async () => {
          await callPersistenceMiddleware(action)

          expect(store.dispatch).toHaveBeenCalledWith({
            type: 'PERSISTENCE:SAVE_STATE_FAILURE',
            payload: {
              error
            }
          })
        })
      })
    })
  })
})
