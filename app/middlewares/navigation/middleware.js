import { NavigationActions } from 'react-navigation'
import {
  GO_TO_CONTACT,
  GO_TO_CONTACT_CREATE,
  GO_TO_GROUP_CREATE,
  GO_TO_GROUP_INFO,
  GO_TO_GROUP_LEAVE,
  GO_TO_GROUP_MEMBER_ADD,
  GO_TO_GROUP_MESSAGE,
  GO_TO_HOME,
  GO_TO_ONBOARDING_AGREE,
  GO_TO_ONBOARDING_INITIALIZE,
  GO_TO_ONBOARDING_REQUEST,
  GO_TO_ONBOARDING_SUBMIT,
  GO_TO_SPLASH,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS
} from 'hg/actions'
import {
  CONTACT,
  CONTACT_CREATE,
  GROUP_CREATE,
  GROUP_INFO,
  GROUP_LEAVE,
  GROUP_MEMBER_ADD,
  GROUP_MESSAGE,
  HOME,
  ONBOARDING_AGREE,
  ONBOARDING_INITIALIZE,
  ONBOARDING_REQUEST,
  ONBOARDING_SUBMIT,
  SPLASH
} from 'hg/navigation/routes'
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
    case CONTACT: {
      if (actionType === GO_TO_CONTACT_CREATE) {
        navigateTo(CONTACT_CREATE)
      }

      if (actionType == GO_TO_GROUP_CREATE) {
        navigateTo(GROUP_CREATE)
      }

      if (actionType == GO_TO_GROUP_MESSAGE) {
        navigateTo(GROUP_MESSAGE)
      }

      break
    }

    case CONTACT_CREATE: {
      if (actionType === GO_TO_CONTACT) {
        navigateTo(CONTACT)
      }

      break
    }

    case GROUP_CREATE: {
      if (actionType === GO_TO_GROUP_INFO) {
        navigateTo(GROUP_INFO, { memberSids: action.payload.member_sids })
      }

      break
    }

    case GROUP_INFO: {
      if (actionType === GO_TO_GROUP_MESSAGE) {
        navigateTo(GROUP_MESSAGE)
      }

      break
    }

    case GROUP_LEAVE: {
      if (actionType === GO_TO_HOME) {
        navigateTo(HOME)
      }

      break
    }

    case GROUP_MEMBER_ADD: {
      if (actionType === GO_TO_GROUP_MESSAGE) {
        navigateTo(GROUP_MESSAGE)
      }

      break
    }

    case GROUP_MESSAGE: {
      if (actionType === GO_TO_GROUP_LEAVE) {
        navigateTo(GROUP_LEAVE)
      }

      if (actionType === GO_TO_GROUP_MEMBER_ADD) {
        navigateTo(GROUP_MEMBER_ADD)
      }

      if (actionType === GO_TO_HOME) {
        navigateTo(HOME)
      }

      break
    }

    case HOME: {
      const countryCode = currentUserCountryCode(nextState)
      const phoneNumber = currentUserPhoneNumber(nextState)
      const verificationCode = currentUserVerificationCode(nextState)

      if (!countryCode || !phoneNumber || !verificationCode) {
        navigateTo(ONBOARDING_AGREE)
      }

      if (actionType === GO_TO_CONTACT) {
        navigateTo(CONTACT)
      }

      if (actionType === GO_TO_GROUP_MESSAGE) {
        navigateTo(GROUP_MESSAGE)
      }

      break
    }

    case ONBOARDING_AGREE: {
      if (actionType === GO_TO_ONBOARDING_REQUEST) {
        navigateTo(ONBOARDING_REQUEST)
      }

      break
    }

    case ONBOARDING_INITIALIZE: {
      if (actionType === GO_TO_HOME) {
        navigateTo(HOME)
      }

      break
    }

    case ONBOARDING_REQUEST: {
      if (actionType === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigateTo(ONBOARDING_SUBMIT)
      }

      break
    }

    case ONBOARDING_SUBMIT: {
      if (actionType === VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigateTo(ONBOARDING_INITIALIZE)
      }

      break
    }

    case SPLASH: {
      if (isWebsocketOnline(nextState)) {
        const countryCode = currentUserCountryCode(nextState)
        const phoneNumber = currentUserPhoneNumber(nextState)
        const verificationCode = currentUserVerificationCode(nextState)

        if (countryCode && phoneNumber && verificationCode) {
          navigateTo(HOME)
        }
        else {
          navigateTo(ONBOARDING_AGREE)
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
