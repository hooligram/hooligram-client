import {
  mapStateToProps,
  mapDispatchToProps
} from '@screens/OnboardingSubmitCode/presenter'

describe('OnboardingSubmitCode.mapDispatchToProps', () => {
  let dispatch, props
  beforeEach(() => {
    dispatch = jest.fn()
    props = mapDispatchToProps(dispatch)
  })

  describe('resendSMS', () => {
    it('should dispatch `API:VERIFICATION_REQUEST_CODE_REQUEST with correct payload`', () => {
      const countryCode = 'some country code'
      const phoneNumber = 'some phone number'

      props.resendVerificationCode(countryCode, phoneNumber)()

      expect(dispatch).toHaveBeenCalledWith({
        type: 'API:VERIFICATION_REQUEST_CODE_REQUEST',
        payload: {
          country_code: countryCode,
          phone_number: phoneNumber
        }
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })

  describe('submitCode', () => {
    it('should dispatch `API:VERIFICATION_SUBMIT_CODE_REQUEST` with correct payload', () => {
      const code = '123456'

      props.submitVerificationCode(code)()

      expect(dispatch).toHaveBeenCalledWith({
        type: 'API:VERIFICATION_SUBMIT_CODE_REQUEST',
        payload: {
          code
        }
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
