import { createStackNavigator, createAppContainer } from 'react-navigation'
import { OnboardingAgree, OnboardingRequestCode } from '@screens'

const routesConfigs = {
  OnboardingAgree: {
    screen: OnboardingAgree
  },
  OnboardingRequestCode: {
    screen: OnboardingRequestCode
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'OnboardingAgree',

}

export default createAppContainer(
  createStackNavigator(routesConfigs, stackNavigatorConfig)
)
