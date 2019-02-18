import { createStackNavigator } from 'react-navigation'
import { Conversation } from '@screens'
import { Colors } from '@constants'
import { StatusBar } from 'react-native'

const routeConfigs = {
  Conversation: {
    screen: Conversation,
    navigationOptions: () => {
      StatusBar.setBackgroundColor(Colors.bolderGreen)

      return {
        title: 'Conversation',
        headerStyle: {
          backgroundColor: Colors.boldGreen
        },
        headerTitleStyle: {
          color: Colors.white
        }
      }
    }
  }
}

const stackNavigatorConfig = {
  initialRouteName: 'Conversation'
}

export default createStackNavigator(
  routeConfigs,
  stackNavigatorConfig
)
