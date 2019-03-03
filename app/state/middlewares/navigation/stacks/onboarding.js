import { createStackNavigator } from 'react-navigation'
import {
  OnboardingAgree,
  OnboardingRequestCode,
  OnboardingInitialize,
  OnboardingSubmitCode,
  OnboardingProfileInfo
} from '@screens'
import { routeNames } from 'hg/state/middlewares/navigation'

const routesConfigs = {
  [routeNames.Agree]: {
    screen: OnboardingAgree
  },
  [routeNames.RequestCode]: {
    screen: OnboardingRequestCode
  },
  [routeNames.SubmitCode]: {
    screen: OnboardingSubmitCode
  },
  [routeNames.Initialize]: {
    screen: OnboardingInitialize
  },
  [routeNames.ProfileInfo]: {
    screen: OnboardingProfileInfo
  }
}

const stackNavigatorConfig = {
  initialRouteName: routeNames.Agree,
  headerMode: 'none'
}

export default createStackNavigator(
  routesConfigs,
  stackNavigatorConfig
)
