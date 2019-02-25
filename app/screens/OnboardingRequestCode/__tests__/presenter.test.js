import { mapStateToProps } from '@hooligram/screens/OnboardingRequestCode/presenter'

describe('OnboardingRequestCode.mapStateToProps', () => {
  let state
  beforeEach(() => {
    state = {
      forms: {
        verification: {
          code: '',
          countryCodes: {
            selected: {
              code: ''
            }
          },
          phoneNumber: ''
        }
      },
      profile: {
        codeRequest: {
          isLoading: false,
          isSuccess: false
        },
        verification: {
          isLoading: false,
          isVerified: false
        }
      }
    }
  })

  describe('given codeRequest', () => {
    it('should return true when code request is successful', () => {
      state.profile.codeRequest.isSuccess = true
      const props = mapStateToProps(state)

      expect(props.isSuccess).toEqual(true)
    })

    it('should return false when code request is failure', () => {
      state.profile.codeRequest.isSuccess = false
      const props = mapStateToProps(state)

      expect(props.isSuccess).toEqual(false)
    })
  })
})
