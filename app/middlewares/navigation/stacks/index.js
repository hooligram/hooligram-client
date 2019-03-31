import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { routeNames } from 'hg/middlewares/navigation'
import { Splash } from 'hg/screens'
import MainStack from './main'
import OnboardingStack from './onboarding'

export default createAppContainer(
  createSwitchNavigator(
    {
      [routeNames.Home]: {
        screen: MainStack
      },
      [routeNames.Onboarding]: {
        screen: OnboardingStack
      },
      [routeNames.Splash]: {
        screen: Splash
      }
    },
    {
      initialRouteName: routeNames.Splash
    }
  )
)
