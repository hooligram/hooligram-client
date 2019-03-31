import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import ConversationStack from './conversation'
import OnboardingStack from './onboarding'
import { routeNames } from 'hg/middlewares/navigation'
import { Splash } from 'hg/screens'

export default createAppContainer(
  createSwitchNavigator(
    {
      [routeNames.Conversation]: {
        screen: ConversationStack
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
