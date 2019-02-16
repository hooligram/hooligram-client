import { createStackNavigator } from 'react-navigation'
import { Conversation } from '@screens'

const routeConfigs = {
  Conversation: {
    screen: Conversation
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'Conversation'
}

export default createStackNavigator(
  routeConfigs,
  stackNavigatorConfig
)
