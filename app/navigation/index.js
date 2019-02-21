import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import OnboardingStackNavigation from '@navigation/onboarding-stack'
import ConversationStackNavigation from '@navigation/conversation-stack'
import routeNames from '@navigation/routeNames'

export default createAppContainer(
  createSwitchNavigator(
    {
      [routeNames.Conversation]: {
        screen: ConversationStackNavigation
      },
      [routeNames.Onboarding]: {
        screen: OnboardingStackNavigation
      }
    },
    {
      initialRouteName: routeNames.Onboarding
    }
  )
)
