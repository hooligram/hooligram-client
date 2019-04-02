import { createSwitchNavigator } from 'react-navigation'
import { SPLASH } from 'hg/middlewares/navigation/routes'
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
    initialRouteName: SPLASH
  }
)
