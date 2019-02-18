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
      state.authorization.token = {
        code: 'some code',
        country_code: 'some country code',
        phone_number: 'some phone number'
      }

      const result = isAuthorized(state)

      expect(result).toBe(true)
    })

    it('should return `false` otherwise', () => {
      [
        {
          code: undefined,
          country_code: 'some country code',
          phone_number: 'some phone number'
        },
        {
          code: '',
          country_code: 'some country code',
          phone_number: 'some phone number'
        }, 
        {
          code: null,
          country_code: 'some country code',
          phone_number: 'some phone number'
        }
      ]
      .forEach(token => {
        const state = {
          authorization: {
            ...authorizationInitialState
          }
        }
        state.authorization.token = token
  
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

    it('should seelct correct country_code from state', () => {
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

    it('should seelct correct country_code from state', () => {
      const expected = 'some phone number'
      state.profile.codeRequest.phone_number = expected

      const result = currentUserPhoneNumber(state)

      expect(result).toEqual(expected)
    })
  })
})