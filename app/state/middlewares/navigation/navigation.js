import {
  PERSISTENCE_SAVE_STATE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS
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
