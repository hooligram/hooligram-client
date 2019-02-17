import { isAuthorized } from '@state/selectors'
import {
  initialState as authorizationInitialState
} from '@state/reducers/authorization'

describe('selectors', () => {
  describe('isAuthorized', () => {
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
})