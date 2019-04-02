import { NavigationActions } from 'react-navigation'
import {
  AGREE_AND_CONTINUE,
  ONBOARDING_INITIALIZE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS
} from 'hg/actions'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserVerificationCode,
  isWebsocketOnline
} from 'hg/selectors'
import {
  HOME,
  ONBOARDING_AGREE,
  ONBOARDING_INITIALIZE,
  ONBOARDING_REQUEST_CODE,
  ONBOARDING_SUBMIT_CODE,
  SPLASH
} from './routes'

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
    case HOME: {
      const countryCode = currentUserCountryCode(nextState)
      const phoneNumber = currentUserPhoneNumber(nextState)
      const verificationCode = currentUserVerificationCode(nextState)

      if (!countryCode || !phoneNumber || !verificationCode) {
        navigateTo(ONBOARDING_AGREE)
      }

      break
    }

    case ONBOARDING_AGREE: {
      if (actionType === AGREE_AND_CONTINUE) {
        navigateTo(ONBOARDING_REQUEST_CODE)
      }

      break
    }

    case ONBOARDING_INITIALIZE: {
      if (actionType === ONBOARDING_INITIALIZE_SUCCESS) {
        navigateTo(HOME)
      }

      break
    }

    case ONBOARDING_REQUEST_CODE: {
      if (actionType === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigateTo(ONBOARDING_SUBMIT_CODE)
      }

      break
    }

    case ONBOARDING_SUBMIT_CODE: {
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

const navigateTo = (route) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: route
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
