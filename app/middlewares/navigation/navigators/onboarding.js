import { createSwitchNavigator } from 'react-navigation'
import { ONBOARDING_AGREE } from 'hg/middlewares/navigation/routes'
import {
  OnboardingAgree,
  OnboardingInitialize,
  OnboardingRequest,
  OnboardingSubmitCode
} from 'hg/screens'

export default createSwitchNavigator(
  {
    OnboardingAgree,
    OnboardingInitialize,
    OnboardingRequest,
    OnboardingSubmitCode
  },
  {
    initialRouteName: ONBOARDING_AGREE
  }
)
