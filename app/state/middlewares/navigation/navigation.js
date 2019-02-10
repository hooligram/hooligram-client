
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
      if (action.type === 'VERIFICATION_REQUEST_CODE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'OnboardingSubmitCode'
          })
        )
      }
      break
    }

    case 'OnboardingSubmitCode': {
      if (action.type === 'VERIFICATION_SUBMIT_CODE_SUCCESS') {
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
    }

    case 'OnboardingProfileInfo': {
      if (action.type === 'PERSISTENCE:USERNAME_SAVE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'Conversation'
          })
        )
      }
    }

    default: 
      break
  }

  return next(action)
}

export default middleware
