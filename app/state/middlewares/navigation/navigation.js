import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  PERSISTENCE_SAVE_STATE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  WEBSOCKET_INIT_SUCCESS
} from '@state/actions'
import { getFullRouteName } from '@state/middlewares/navigation/utils'

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

      if ([PERSISTENCE_LOAD_STATE_SUCCESS, WEBSOCKET_INIT_SUCCESS].includes(action.type)) {
        const {
          app: {
            websocketOnline
          },
          authorization: {
            country_code,
            phone_number,
            token
          }
        } = nextState

        if (!websocketOnline) return
        if (!country_code) return
        if (!phone_number) return
        if (!token) return

        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'Conversation'
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

    case '/Onboarding/ProfileInfo': {
      if (action.type === PERSISTENCE_SAVE_STATE_SUCCESS) {
        const {
          profile: {
            info: {
              isSaved: isUserNameSaved,
              isSaving: isSavingUserName
            }
          }
        } = nextState

        if (!isSavingUserName && isUserNameSaved) {
          navigator.dispatch(
            navigationActions.navigate({
              routeName: 'Conversation'
            })
          )
        }
      }
      break
    }

    default:
      break
  }

  return returnedAction
}

export default middleware
