import { ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { actions, routes } from 'hg/constants'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode,
  isWebsocketOnline
} from 'hg/selectors'

let navigator

export default store => next => action => {
  const actionType = action.type
  const nextAction = next(action)
  const nextState = store.getState()

  if (!navigator) {
    return nextAction
  }

  const routePath = getCurrentRoutePath(navigator.state.nav)
  const currentRoute = routePath[routePath.length - 1]

  switch (currentRoute) {
    case routes.CONTACT: {
      if (actionType === actions.GO_TO_CONTACT_CREATE) {
        navigateTo(routes.CONTACT_CREATE)
      }

      if (actionType === actions.GO_TO_DIRECT_MESSAGE) {
        navigateTo(routes.DIRECT_MESSAGE, {
          groupId: action.payload.group_id
        })
      }

      if (actionType === actions.GO_TO_GROUP_CREATE) {
        navigateTo(routes.GROUP_CREATE)
      }

      if (actionType === actions.GO_TO_GROUP_MESSAGE) {
        navigateTo(routes.GROUP_MESSAGE)
      }

      if (actionType === actions.GROUP_CREATE_SUCCESS) {
        navigateTo(routes.DIRECT_MESSAGE, {
          groupId: action.payload.group_id
        })
      }

      break
    }

    case routes.CONTACT_CREATE: {
      if (actionType === actions.GO_TO_CONTACT_EDIT) {
        navigateTo(routes.CONTACT_EDIT, {
          contactSid: action.payload.contact_sid,
          goBack: action.payload.should_go_back
        })
      }

      break
    }

    case routes.CONTACT_EDIT: {
      if (actionType === actions.GO_TO_CONTACT) {
        navigateTo(routes.CONTACT)
      }

      break
    }

    case routes.DIRECT_MESSAGE: {
      if (actionType === actions.GO_TO_CONTACT_EDIT) {
        navigateTo(routes.CONTACT_EDIT, {
          contactSid: action.payload.contact_sid,
          goBack: action.payload.should_go_back
        })
      }

      if (actionType === actions.GO_TO_GROUP_LEAVE) {
        navigateTo(routes.GROUP_LEAVE, {
          groupId: action.payload.group_id
        })
      }

      break
    }

    case routes.GROUP_CREATE: {
      if (actionType === actions.GROUP_CREATE_FAILURE) {
        ToastAndroid.showWithGravity(
          'Unable to create the group. Can you try again?',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }

      if (actionType === actions.GROUP_CREATE_SUCCESS) {
        navigateTo(routes.HOME)
      }

      break
    }

    case routes.GROUP_LEAVE: {
      if (actionType === actions.GO_TO_HOME) {
        navigateTo(routes.HOME)
      }

      break
    }

    case routes.GROUP_MEMBER_ADD: {
      if (actionType === actions.GO_TO_GROUP_MESSAGE) {
        navigateTo(routes.GROUP_MESSAGE, {
          groupId: action.payload.group_id
        })
      }

      break
    }

    case routes.GROUP_MESSAGE: {
      if (actionType === actions.GO_TO_GROUP_LEAVE) {
        navigateTo(routes.GROUP_LEAVE, {
          groupId: action.payload.group_id
        })
      }

      if (actionType === actions.GO_TO_GROUP_MEMBER_ADD) {
        navigateTo(routes.GROUP_MEMBER_ADD, {
          groupId: action.payload.group_id
        })
      }

      if (actionType === actions.GO_TO_HOME) {
        navigateTo(routes.HOME)
      }

      break
    }

    case routes.HOME: {
      const countryCode = currentUserCountryCode(nextState)
      const phoneNumber = currentUserPhoneNumber(nextState)
      const verificationCode = currentUserVerificationCode(nextState)

      if (!countryCode || !phoneNumber || !verificationCode) {
        navigateTo(routes.ONBOARDING_AGREE)
      }

      if (actionType === actions.GO_TO_CONTACT) {
        navigateTo(routes.CONTACT)
      }

      if (actionType == actions.GO_TO_DIRECT_MESSAGE) {
        navigateTo(routes.DIRECT_MESSAGE, {
          groupId: action.payload.group_id
        })
      }

      if (actionType === actions.GO_TO_GROUP_MESSAGE) {
        const groupId = action.payload.group_id
        navigateTo(routes.GROUP_MESSAGE, { groupId })
      }

      break
    }

    case routes.ONBOARDING_AGREE: {
      if (actionType === actions.GO_TO_ONBOARDING_REQUEST) {
        navigateTo(routes.ONBOARDING_REQUEST)
      }

      break
    }

    case routes.ONBOARDING_INITIALIZE: {
      if (actionType === actions.GO_TO_HOME) {
        navigateTo(routes.HOME)
      }

      break
    }

    case routes.ONBOARDING_REQUEST: {
      if (actionType === actions.VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigateTo(routes.ONBOARDING_SUBMIT)
      }

      break
    }

    case routes.ONBOARDING_SUBMIT: {
      if (actionType === actions.VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigateTo(routes.ONBOARDING_INITIALIZE)
      }

      break
    }

    case routes.SPLASH: {
      if (isWebsocketOnline(nextState)) {
        const countryCode = currentUserCountryCode(nextState)
        const phoneNumber = currentUserPhoneNumber(nextState)
        const verificationCode = currentUserVerificationCode(nextState)

        if (countryCode && phoneNumber && verificationCode) {
          navigateTo(routes.HOME)
        }
        else {
          navigateTo(routes.ONBOARDING_AGREE)
        }
      }

      break
    }

    default: {
      break
    }
  }

  return nextAction
}

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const getCurrentRoutePath = (nav) => {
  if (nav.index === undefined) {
    return []
  }

  return recurseRoute(nav.routes[nav.index])
}

const navigateTo = (routeName, params = {}) => {
  navigator.dispatch(
    NavigationActions.navigate({
      params,
      routeName
    })
  )
}

const recurseRoute = (route, path = []) => {
  const nextIndex = route.index

  if (nextIndex === undefined) {
    return path.concat([route.routeName])
  }

  return [route.routeName].concat(recurseRoute(route.routes[nextIndex], path))
}
