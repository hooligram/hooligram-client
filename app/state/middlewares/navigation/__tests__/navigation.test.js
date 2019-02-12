import navigationMiddleware from '@state/middlewares/navigation'
import { setTopLevelNavigator } from '@state/middlewares/navigation/navigation'

describe('navigation middleware', () => {
  let navigationActions, callMiddleware, store, next
  beforeEach(() => {
    navigationActions = {
      navigate: jest.fn()
    }
    store = {
      dispatch: jest.fn()
    }
    next = jest.fn((action) => action)
    callMiddleware = navigationMiddleware(navigationActions)(store)(next)
  })

  describe('current route is `OnboardingAgree`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                routeName: 'OnboardingAgree'
              }
            ]
          }
        }
      })
    })

    describe('action is `AGREE_AND_CONTINUE`', () => {
      let action
      beforeEach(() => {
        action = {
          type: 'AGREE_AND_CONTINUE',
          payload: {}
        }
      })

      it('should navigate to `OnboardingRequestCode`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'OnboardingRequestCode'
        })
        expect(navigationActions.navigate).toHaveBeenCalledTimes(1)
      })

      it('should call `next` on action', () => {
        callMiddleware(action)

        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
      })

      it('should return action', () => {
        const returnedAction = callMiddleware(action)

        expect(returnedAction).toEqual(action)
      })
    })
  })

  describe('current route is `OnboardingRequestCode`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                routeName: 'OnboardingRequestCode'
              }
            ]
          }
        }
      })
    })

    describe('verification code request successful', () => {
      let action
      beforeEach(() => {
        action = {
          type: 'API:VERIFICATION_REQUEST_CODE_SUCCESS',
          payload: {}
        }
      })

      it('should navigate to `OnboardingSubmitCode`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'OnboardingSubmitCode'
        })
        expect(navigationActions.navigate).toHaveBeenCalledTimes(1)
      })

      it('should return the action', () => {
        const returnedAction = callMiddleware(action)

        expect(returnedAction).toEqual(action)
      })

      it('should call `next` on action', () => {
        callMiddleware(action)

        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('current route is `OnboardingSubmitCode`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                routeName: 'OnboardingSubmitCode'
              }
            ]
          }
        }
      })
    })

    describe('verification code submission successful', () => {
      const action = {
        type: 'API:VERIFICATION_SUBMIT_CODE_SUCCESS',
        payload: {
          somePayload: 'somePayload'
        }
      }

      it('should navigate to `OnboardingInitialize`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenLastCalledWith({
          routeName: 'OnboardingInitialize'
        })
        expect(navigationActions.navigate).toHaveBeenCalledTimes(1)
      })

      it('should return the action', () => {
        const returnedAction = callMiddleware(action)

        expect(returnedAction).toEqual(action)
      })

      it('should call `next` on action', () => {
        callMiddleware(action)

        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('current route is `OnboardingInitialize`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                routeName: 'OnboardingInitialize'
              }
            ]
          }
        }
      })
    })

    describe('initialization process has not been completed', () => {
      const action = {
        type: 'SOME_ACTION',
        payload: {
          somePayload: 'some payload'
        }
      }

      it('should not navigate away', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).not.toHaveBeenCalled()
      })
    })

    describe('initialization process has been completed', () => {
      const action = {
        type: 'ONBOARDING_INITIALIZE_SUCCESS',
        payload: {
          somePayload: 'some payload'
        }
      }

      it('should navigate to `OnboardingProfileInfo` screen', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'OnboardingProfileInfo'
        })
      })
    })
  })

  describe('current route is `OnboardingProfileInfo`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                routeName: 'OnboardingProfileInfo'
              }
            ]
          }
        }
      })
    })

    describe('user has not saved username', () => {
      const action = {
        type: 'SOME_ACTION',
        payload: {
          somePayload: 'some payload'
        }
      }

      it('should not navigate away', () => {
        const returnedAction = callMiddleware(action)

        expect(navigationActions.navigate).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
        expect(returnedAction).toEqual(action)
      })
    })

    describe('user has successfully saved username', () => {
      const action = {
        type: 'PERSISTENCE:USERNAME_SAVE_SUCCESS',
        payload: {
          username: 'someusername'
        }
      }

      it('should navigate to `GlobalChat` screen', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'Conversation'
        })
      })
    })
  })
})
