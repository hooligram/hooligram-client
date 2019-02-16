import {
  PERSISTENCE_SAVE_STATE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS
} from '@state/actions'

let navigator

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const middleware = navigationActions => store => next => action => {
  if (!navigator) {
    return next(action)
  }

  const route = navigator.state.nav.routes[navigator.state.nav.index]
  const fullRouteName = `${route.routeName}.${route.routes[route.index].routeName}`
  const { getState } = store

  const prevState = store.getState()
  const returnedAction = next(action)
  const nextState = store.getState()

  switch (fullRouteName) {
    case 'Onboarding.OnboardingAgree': {
      if (action.type === 'AGREE_AND_CONTINUE') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingRequestCode'
          })
        )
      }
      break
    }

    case 'Onboarding.OnboardingRequestCode': {
      if (action.type === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingSubmitCode'
          })
        )
      }
      break
    }

    case 'Onboarding.OnboardingSubmitCode': {
      if (action.type === VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingInitialize'
          })
        )
      }
      break
    }

    case 'Onboarding.OnboardingInitialize': {
      if (action.type === 'ONBOARDING_INITIALIZE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingProfileInfo'
          })
        )
      }
      break
    }

    case 'Onboarding.OnboardingProfileInfo': {
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
