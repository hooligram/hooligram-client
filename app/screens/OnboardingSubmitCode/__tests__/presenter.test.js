import { 
  mapStateToProps,
  mapDispatchToProps
} from '@screens/OnboardingSubmitCode/presenter'

describe('OnboardingSubmitCode.mapStateToProps', () => {
  let state
  beforeAll(() => {
    state = {
      profile: {
        codeRequest: {
          isLoading: true
        },
        verification: {
          isLoading: true,
          isVerified: true
        }
      },
      forms: {
        verification: {
          phoneNumber: '',
          countryCodes: {
            selected: {
              code: ''
            }
          },
          code: ''
        }
      }
    }
  })

  describe('given complete phone number & country code', () => {
    beforeAll(() => {
      state.forms.verification.phoneNumber = '6471119999'
      state.forms.verification.countryCodes.selected.code = '60'
    })

    it('should format phoneNumber correctly', () => {
      const props = mapStateToProps(state)
      expect(props.phoneNumber).toEqual('+60 (647) 111-9999')
    })
  })

  describe('verification code has less than 6 digits', () => {
    beforeAll(() => {
      state.forms.verification.code = '123'
    })

    it('should disable submit', () => {
      const props = mapStateToProps(state)
      expect(props.isSubmitDisabled).toEqual(true)
    })
  })

  describe('verification code has 6 digits', () => {
    beforeAll(() => {
      state.forms.verification.code = '123456'
    })

    it('should enable submit', () => {
      const props = mapStateToProps(state)
      expect(props.isSubmitDisabled).toEqual(false)
    })
  })

  describe('given profile verification state', () => {
    beforeEach(() => {
      state.profile.verification.isVerified = 'isVerified'
      state.profile.verification.isLoading = 'isLoading'

      const props = mapStateToProps(state)

      expect(props.isSubmitLoading).toEqual('isLoading')
      expect(props.isVerified).toEqual('isVerified')
    })
  })
})

describe('OnboardingSubmitCode.mapDispatchToProps', () => {
  let dispatch, props
  beforeEach(() => {
    dispatch = jest.fn()
    props = mapDispatchToProps(dispatch)
  })

  describe('onChangeCode', () => {
    it('should dispatch `FORMS:VERIFICATION_SET_CODE` with correct payload', () => {
      props.onChangeCode('123456')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'FORMS:VERIFICATION_SET_CODE',
        payload: {
          code: '123456'
        }
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it('should not dispatch `FORMS:VERIFICATION_SET_CODE` if code length more than 6', () => {
      props.onChangeCode('1234567')

      expect(dispatch).toHaveBeenCalledTimes(0)
    })
  })

  describe('resendSMS', () => {
    it('should dispatch `API:VERIFICATION_REQUEST_CODE_REQUEST with correct payload`', () => {
      const countryCode = 'some country code'
      const phoneNumber = 'some phone number'
      
      props.resendSMS(countryCode, phoneNumber)()

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
      
      props.submitCode(code)()

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
