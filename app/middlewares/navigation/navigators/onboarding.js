import { createSwitchNavigator } from 'react-navigation'
import { ONBOARDING_AGREE } from 'hg/middlewares/navigation/routes'
import {
  OnboardingAgree,
  OnboardingInitialize,
  OnboardingRequestCode,
  OnboardingSubmitCode
} from 'hg/screens'

export default createSwitchNavigator(
  {
    OnboardingAgree,
    OnboardingInitialize,
    OnboardingRequestCode,
    OnboardingSubmitCode
  },
  {
    initialRouteName: ONBOARDING_AGREE
  }
)
