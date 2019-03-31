import { createStackNavigator } from 'react-navigation'
import { Conversation } from 'hg/screens'
import { colors } from 'hg/constants'
import { StatusBar } from 'react-native'
import { routeNames } from 'hg/state/middlewares/navigation'

const routeConfigs = {
  [routeNames.Conversation]: {
    screen: Conversation,
    navigationOptions: () => {
      StatusBar.setBackgroundColor(colors.BOLDER_GREEN)

      return {
        title: 'Conversation',
        headerStyle: {
          backgroundColor: colors.BOLD_GREEN
        },
        headerTitleStyle: {
          color: colors.WHITE
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
