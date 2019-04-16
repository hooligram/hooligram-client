import { createSwitchNavigator } from 'react-navigation'
import { routes } from 'hg/constants'
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
    initialRouteName: routes.ONBOARDING_AGREE
  }
)
