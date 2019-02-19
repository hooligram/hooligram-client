import { createStackNavigator, createAppContainer } from 'react-navigation'
import {
  OnboardingAgree, 
  OnboardingRequestCode,
  OnboardingInitialize,
  OnboardingSubmitCode,
  OnboardingProfileInfo
} from '@screens'

const routesConfigs = {
  OnboardingAgree: {
    screen: OnboardingAgree
  },
  OnboardingRequestCode: {
    screen: OnboardingRequestCode
  },
  OnboardingSubmitCode: {
    screen: OnboardingSubmitCode
  },
  OnboardingInitialize: {
    screen: OnboardingInitialize
  },
  OnboardingProfileInfo: {
    screen: OnboardingProfileInfo
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'OnboardingAgree',
  headerMode: 'none'
}

export default createStackNavigator(
  routesConfigs,
  stackNavigatorConfig
)
