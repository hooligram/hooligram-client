import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  SET_USER_NAME,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  WEBSOCKET_OPEN
} from 'hg/actions'
import { appStartupSuccess } from 'hg/actions/app'
import { getFullRouteName } from 'hg/middlewares/navigation/utils'
import routeNames from './route-names'

let navigator

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const middleware = navigationActions => store => next => action => {
  if (!navigator) {
    return next(action)
  }

  const fullRouteName = getFullRouteName(navigator)
  const { getState } = store

  const prevState = store.getState()
  const returnedAction = next(action)
  const nextState = store.getState()

  switch (fullRouteName) {
    case '/Onboarding/Agree': {
      if (action.type === 'AGREE_AND_CONTINUE') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'RequestCode'
          })
        )
      }
      break
    }

    case '/Onboarding/RequestCode': {
      if (action.type === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'SubmitCode'
          })
        )
      }
      break
    }

    case '/Onboarding/SubmitCode': {
      if (action.type === VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'Initialize'
          })
        )
      }
      break
    }

    case '/Onboarding/Initialize': {
      if (action.type === 'ONBOARDING_INITIALIZE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'ProfileInfo'
          })
        )
      }
      break
    }

    case `/${routeNames.Onboarding}/${routeNames.ProfileInfo}`: {
      if (action.type === SET_USER_NAME) {
        const {
          profile: {
            userName,
          }
        } = nextState

        if (userName) {
          navigator.dispatch(
            navigationActions.navigate({
              routeName: 'Home'
            })
          )
        }
      }
      break
    }

    case `/${routeNames.Splash}`: {
      if ([PERSISTENCE_LOAD_STATE_SUCCESS, WEBSOCKET_OPEN].includes(action.type)) {
        const {
          app: {
            isWebsocketOnline
          },
          authorization: {
            country_code,
            phone_number,
            token
          }
        } = nextState

        if (!isWebsocketOnline) return

        let routeName = routeNames.Home

        if (!country_code || !phone_number || !token) {
          routeName = routeNames.Agree
        }

        store.dispatch(appStartupSuccess())
        navigator.dispatch(
          navigationActions.navigate({
            routeName
          })
        )
      }
      break
    }

    default:
      break
  }

  return returnedAction
}

export default middleware
