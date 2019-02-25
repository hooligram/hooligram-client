import { createStackNavigator } from 'react-navigation'
import { Conversation } from '@hooligram/screens'
import { Colors } from '@hooligram/constants'
import { StatusBar } from 'react-native'
import routeNames from '@navigation/routeNames'

const routeConfigs = {
  [routeNames.Conversation]: {
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
