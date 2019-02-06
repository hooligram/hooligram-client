// import PersistenceApi from '@persistence-api/persistence-api'

describe('persistence-api', () => {
  describe('getState', () => {
    describe('state exists in storage', () => {
      let PersistenceApi
      beforeEach(() => {
        jest.resetAllMocks()
        jest.mock('react-native', () => {
          return {
            AsyncStorage: {
              getItem: jest.fn(() => {
                return new Promise(resolve =>
                  resolve({
                    mockedData: 'mockedData'
                  })
                )
              })
            }
          }
        })
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
        jest.doMock('react-native', () => {
          return {
            AsyncStorage: {
              getItem: jest.fn(() => {
                return new Promise((_, reject) =>
                  reject()
                )
              })
            }
          }
        })
        PersistenceApi = require('@persistence-api/persistence-api').default
      })
  
      it('should return `undefined`', async () => {
        const state = await PersistenceApi.getState()
  
        expect(state).toEqual(undefined)
      })
    })
  })
})
