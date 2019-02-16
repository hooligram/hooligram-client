import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import OnboardingStackNavigation from '@navigation/onboarding-stack'
import ConversationStackNavigation from '@navigation/conversation-stack'

export default createAppContainer(
  createSwitchNavigator(
    {
      Conversation: {
        screen: ConversationStackNavigation
      },
      Onboarding: {
        screen: OnboardingStackNavigation
      }
    },
    {
      initialRouteName: 'Onboarding'
    }
  )
)
