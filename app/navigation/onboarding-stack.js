import { createStackNavigator, createAppContainer } from 'react-navigation'
import {
  Conversation,
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
  },
  Conversation: {
    screen: Conversation
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'OnboardingProfileInfo',
  headerMode: 'none'

}

export default createAppContainer(
  createStackNavigator(routesConfigs, stackNavigatorConfig)
)
