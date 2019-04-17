import { createStackNavigator } from 'react-navigation'
import { colors, dimensions, routes } from 'hg/constants'
import {
  Contact,
  ContactEdit,
  ContactCreate,
  DirectMessage,
  GroupCreate,
  GroupLeave,
  GroupMemberAdd,
  GroupMessage,
  Home
} from 'hg/screens'

export default createStackNavigator(
  {
    Contact,
    ContactCreate,
    ContactEdit,
    DirectMessage,
    GroupCreate,
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
        color: colors.TEAL,
        marginHorizontal: dimensions.MARGIN
      }
    },
    headerMode: 'float',
    initialRouteName: routes.HOME
  }
)
