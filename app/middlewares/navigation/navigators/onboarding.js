import { createSwitchNavigator } from 'react-navigation'
import { ONBOARDING_AGREE } from 'hg/middlewares/navigation/routes'
import {
  OnboardingAgree,
  OnboardingInitialize,
  OnboardingRequest,
  OnboardingSubmit
} from 'hg/screens'

export default createSwitchNavigator(
  {
    OnboardingAgree,
    OnboardingInitialize,
    OnboardingRequest,
    OnboardingSubmit
  },
  {
    initialRouteName: ONBOARDING_AGREE
  }
)
