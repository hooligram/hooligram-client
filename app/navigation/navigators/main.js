import { createStackNavigator } from 'react-navigation'
import { colors, dimensions } from 'hg/constants'
import {
  HOME
} from 'hg/navigation/routes'
import {
  Contact,
  ContactCreate,
  DirectMessage,
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
    DirectMessage,
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
        elevation: 0
      },
      headerTitleStyle: {
        color: colors.BOLD_GREEN,
        marginHorizontal: dimensions.MARGIN
      }
    },
    headerMode: 'float',
    initialRouteName: HOME
  }
)
