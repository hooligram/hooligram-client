import selectors from '@state/selectors'
import {
  initialState as authorizationInitialState
} from '@state/reducers/authorization'
import {
  initialState as profileCodeRequestInitialState
} from '@state/reducers/profile/code-request'

describe('selectors', () => {
  describe('isAuthorized', () => {
    const { isAuthorized } = selectors

    it('should return `true` when all token items available', () => {
      const state = {
        authorization: {
          ...authorizationInitialState
        }
      }
      state.authorization = {
        token: 'some code',
        country_code: 'some country code',
        phone_number: 'some phone number'
      }

      const result = isAuthorized(state)

      expect(result).toBe(true)
    })

    it('should return `false` otherwise', () => {
      [
        {
          token: undefined,
          country_code: 'some country code',
          phone_number: 'some phone number'
        },
        {
          token: '',
          country_code: 'some country code',
          phone_number: 'some phone number'
        }, 
        {
          token: null,
          country_code: 'some country code',
          phone_number: 'some phone number'
        }
      ]
      .forEach(authorizationState => {
        const state = {
          authorization: {
            ...authorizationInitialState,
            ...authorizationState
          }
        }
  
        const result = isAuthorized(state)
  
        expect(result).toBe(false)
      })
    })
  })

  describe('currentUserCountryCode', () => {
    const { currentUserCountryCode } = selectors
    let state
    beforeEach(() => {
      state = {
        profile: {
          codeRequest: { ...profileCodeRequestInitialState }
        }
      }
    })

    it('should return `undefined` when not available', () => {
      const result = currentUserCountryCode(state)

      expect(result).toEqual(undefined)
    })

    it('should select correct country_code from state', () => {
      const expected = 'some country code'
      state.profile.codeRequest.country_code = expected

      const result = currentUserCountryCode(state)

      expect(result).toEqual(expected)
    })
  })

  describe('currentUserPhoneNumber', () => {
    const { currentUserPhoneNumber } = selectors
    let state
    beforeEach(() => {
      state = {
        profile: {
          codeRequest: { ...profileCodeRequestInitialState }
        }
      }
    })

    it('should return `undefined` when not available', () => {
      const result = currentUserPhoneNumber(state)

      expect(result).toEqual(undefined)
    })

    it('should select correct country_code from state', () => {
      const expected = 'some phone number'
      state.profile.codeRequest.phone_number = expected

      const result = currentUserPhoneNumber(state)

      expect(result).toEqual(expected)
    })
  })

  describe('currentUserCode', () => {
    const { currentUserCode } = selectors
    let state
    beforeEach(() => {
      state = {
        profile: {
          codeRequest: { ...profileCodeRequestInitialState }
        }
      }
    })

    it('should return `undefined` when not available', () => {
      const result = currentUserCode(state)

      expect(result).toEqual(undefined)
    })

    it('should select correct `code` from state', () => {
      const expected = 'some code'
      state.profile.codeRequest.code = expected

      const result = currentUserCode(state)

      expect(result).toEqual(expected)
    })
  })

  describe('messages', () => {
    const { messages } = selectors
    let state
    beforeEach(() => {
      state = {
        messages: {
          byId: {},
          allIds: []
        }
      }
    })

    it('should return empty array if no messages', () => {
      const result = messages(state)

      expect(result).toBeArrayOfSize(0)
    })

    it('should return messages as array', () => {
      state.messages = {
        byId: {
          id1: {
            id: 'id1',
            message: 'first message'
          },
          id2: {
            id: 'id2',
            message: 'second message'
          }
        },
        allIds: ['id1', 'id2']
      }

      const result = messages(state)

      expect(result).toBeArrayOfSize(2)
      expect(result).toIncludeAllMembers([
        {
          id: 'id1',
          message: 'first message'
        },
        {
          id: 'id2',
          message: 'second message'
        }
      ])
    })
  })
})