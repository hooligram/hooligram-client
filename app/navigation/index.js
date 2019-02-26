import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import ConversationStackNavigation from '@navigation/conversation-stack'
import OnboardingStackNavigation from '@navigation/onboarding-stack'
import routeNames from '@navigation/routeNames'
import { Splash } from '@screens'

export default createAppContainer(
  createSwitchNavigator(
    {
      [routeNames.Conversation]: {
        screen: ConversationStackNavigation
      },
      [routeNames.Onboarding]: {
        screen: OnboardingStackNavigation
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
