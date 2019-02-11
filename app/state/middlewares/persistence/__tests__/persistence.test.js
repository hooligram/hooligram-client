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

    it('should try to request state from storage', async () => {
      await callPersistenceMiddleware(action)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'PERSISTENCE:LOAD_STATE_REQUEST',
        payload: {}
      })
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
  
      console.log('this is ok')
      const returnedAction = await callPersistenceMiddleware(action)
      console.log('something went wrong after await')
  
      it('should not dispatch any action', () => {
        expect(store.dispatch).not.toHaveBeenCalled()
      })
  
      it('should call propagate the action to next middleware', () => {
        expect(store.next.toHaveBeenCalledWith(action))
        expect(returnedAction).toEqual("?")
      })
    })
  })

  describe('action is an api response action', () => {
    [
      'API:SOME_ACTION_SUCCESS',
      'API:SOME_ACTION_FAILURE'
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
        const nextState = 'nextState'
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
