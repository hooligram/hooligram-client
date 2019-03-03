import { createStackNavigator } from 'react-navigation'
import { Conversation } from 'hg/screens'
import { colors } from 'hg/constants'
import { StatusBar } from 'react-native'
import { routeNames } from 'hg/state/middlewares/navigation'

const routeConfigs = {
  [routeNames.Conversation]: {
    screen: Conversation,
    navigationOptions: () => {
      StatusBar.setBackgroundColor(colors.bolderGreen)

      return {
        title: 'Conversation',
        headerStyle: {
          backgroundColor: colors.boldGreen
        },
        headerTitleStyle: {
          color: colors.white
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
