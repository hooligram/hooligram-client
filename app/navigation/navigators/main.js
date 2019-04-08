import { createStackNavigator } from 'react-navigation'
import { colors } from 'hg/constants'
import {
  HOME
} from 'hg/navigation/routes'
import {
  Contact,
  ContactCreate,
  GroupCreate,
  GroupInfo,
  GroupLeave,
  GroupMemberAdd,
  GroupMessage,
  Home
} from 'hg/screens'

export default createStackNavigator(
  {
    Contact,
    ContactCreate,
    GroupCreate,
    GroupInfo,
    GroupLeave,
    GroupMemberAdd,
    GroupMessage,
    Home
  },
  {
    defaultNavigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: colors.WHITE
      },
      headerTitleStyle: {
        color: colors.BOLD_GREEN
      }
    },
    headerMode: 'float',
    initialRouteName: HOME
  }
)
