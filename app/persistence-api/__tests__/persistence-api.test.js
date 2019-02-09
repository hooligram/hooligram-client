// import PersistenceApi from '@persistence-api/persistence-api'

describe('persistence-api', () => {
  describe('getState', () => {
    describe('state exists in storage', () => {
      let PersistenceApi
      beforeEach(() => {
        jest.resetAllMocks()
        jest.mock('react-native', () => ({
          AsyncStorage: {
            getItem: jest.fn(() =>
              new Promise(resolve =>
                resolve('{"mockedData": "mockedData"}')
              )
            ),
            setItem: jest.fn()
          }
        }))
        PersistenceApi = require('@persistence-api/persistence-api').default
      })

      it('should return state from storage', async () => {
        const state = await PersistenceApi.getState()
  
        expect(state).toEqual({
          mockedData: 'mockedData'
        })
      })
    })

    describe('state does not exist in storage', () => {
      let PersistenceApi
      beforeEach(() => {
        jest.resetAllMocks()
        jest.doMock('react-native', () => ({
          AsyncStorage: {
            getItem: jest.fn(() => {
              return new Promise(resolve =>
                resolve('{}')
              )
            }),
            setItem: jest.fn()
          }
        }))
        PersistenceApi = require('@persistence-api/persistence-api').default
      })
  
      it('should return `undefined`', async () => {
        const state = await PersistenceApi.getState()
  
        expect(state).toEqual(undefined)
      })
    })
  })

  describe('saveState', () => {
    let PersistenceApi, AsyncStorage, state
    beforeEach(() => {
      jest.resetAllMocks()
      jest.mock('react-native', () => ({
        AsyncStorage: {
          getItem: jest.fn(),
          setItem: jest.fn((key, state) =>
            new Promise(resolve =>
              resolve(undefined)
            )
          )
        }
      }))
      PersistenceApi = require('@persistence-api/persistence-api').default
      AsyncStorage = require('react-native').AsyncStorage
    })

    describe('state is serializable', () => {
      beforeEach(() => {
        state = {
          someState: 'some state'
        }
      })

      it('should save state as string', async () => {
        await PersistenceApi.saveState(state)

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('STORAGE:STATE', '{\"someState\":\"some state\"}')
      })
    })

    describe('state is not serializable', () => {
      let state
      beforeEach(() => {
        state = {};
        state.myself = state;
      })

      it('should throw error', async done => {
        try {
          await PersistenceApi.saveState(state)
          fail()
        }
        catch (err) {
          done()
        }
      })
    })

    describe('Storage fails to save', () => {
      let state
      beforeEach(() => {
        AsyncStorage.setItem = jest.fn(() => 
          new Promise((_, reject) => 
            reject()
          )
        )
      })

      it('should throw error', async done => {
        try {
          await PersistenceApi.saveState(state)
          fail()
        }
        catch (err) {
          done()
        }
      })
    })
  })
})
