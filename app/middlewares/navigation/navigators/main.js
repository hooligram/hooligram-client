import { createStackNavigator } from 'react-navigation'
import { colors } from 'hg/constants'
import { HOME } from 'hg/middlewares/navigation/routes'
import { Home } from 'hg/screens'

export default createStackNavigator(
  {
    Home
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.BOLD_GREEN
      },
      headerTitleStyle: {
        color: colors.WHITE
      }
    },
    initialRouteName: HOME
  }
)
