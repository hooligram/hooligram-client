import { createSwitchNavigator } from 'react-navigation'
import { routes } from 'hg/constants'
import { Splash } from 'hg/screens'
import MainStack from './main'
import OnboardingSwitch from './onboarding'

export default createSwitchNavigator(
  {
    MainStack,
    OnboardingSwitch,
    Splash
  },
  {
    initialRouteName: routes.SPLASH
  }
)
