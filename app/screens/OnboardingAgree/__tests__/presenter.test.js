import { mapDispatchToProps } from '@hooligram/screens/OnboardingAgree/presenter'

describe('OnboardingAgree.mapDispatchToProps', () => {
  let dispatch, props
  beforeEach(() => {
    dispatch = jest.fn()
    props = mapDispatchToProps(dispatch)
  })

  describe('agreeAndContinue', () => {
    it('should dispatch `AGREE_AND_CONTINUE`', () => {
      props.agreeAndContinue()

      expect(dispatch).toHaveBeenCalledWith({
        type: 'AGREE_AND_CONTINUE',
        payload: {}
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
