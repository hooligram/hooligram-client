import { StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { colors } from 'hg/constants'
import { routeNames } from 'hg/middlewares/navigation'
import { Home } from 'hg/screens'

const routeConfigs = {
  [routeNames.Home]: {
    screen: Home,
    navigationOptions: () => {
      StatusBar.setBackgroundColor(colors.BOLDER_GREEN)

      return {
        title: 'Hooligram',
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
  initialRouteName: 'Home'
}

export default createStackNavigator(
  routeConfigs,
  stackNavigatorConfig
)
