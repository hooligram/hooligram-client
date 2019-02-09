import { createStackNavigator, createAppContainer } from 'react-navigation'
import { 
  OnboardingAgree, 
  OnboardingRequestCode,
  OnboardingInitialize,
  OnboardingSubmitCode
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
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'OnboardingAgree',
  headerMode: 'none'

}

export default createAppContainer(
  createStackNavigator(routesConfigs, stackNavigatorConfig)
)
