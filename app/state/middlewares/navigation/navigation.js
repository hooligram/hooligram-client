import {
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS
} from '@state/actions/profile'

let navigator

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const middleware = navigationActions => store => next => action => {
  if (!navigator) {
    return next(action)
  }

  const {
    routeName: currentRouteName
  } = navigator.state.nav.routes[navigator.state.nav.index]
  const { getState } = store

  const prevState = store.getState()
  const returnedAction = next(action)
  const nextState = store.getState()

  switch (currentRouteName) {
    case 'OnboardingAgree': {
      if (action.type === 'AGREE_AND_CONTINUE') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingRequestCode'
          })
        )
      }
      break
    }

    case 'OnboardingRequestCode': {
      if (action.type === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingSubmitCode'
          })
        )
      }
      break
    }

    case 'OnboardingSubmitCode': {
      if (action.type === VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingInitialize'
          })
        )
      }
      break
    }

    case 'OnboardingInitialize': {
      if (action.type === 'ONBOARDING_INITIALIZE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingProfileInfo'
          })
        )
      }
      break
    }

    case 'OnboardingProfileInfo': {
      if (action.type === 'PERSISTENCE:SAVE_STATE_SUCCESS') {
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
