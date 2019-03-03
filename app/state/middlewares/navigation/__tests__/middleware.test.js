import navigationMiddleware from 'hg/state/middlewares/navigation/middleware'
import { setTopLevelNavigator } from 'hg/state/middlewares/navigation/middleware'

describe('navigation middleware', () => {
  let navigationActions, callMiddleware, store, next
  beforeEach(() => {
    navigationActions = {
      navigate: jest.fn()
    }
    store = {
      dispatch: jest.fn(),
      getState: jest.fn()
    }
    next = jest.fn((action) => action)
    callMiddleware = navigationMiddleware(navigationActions)(store)(next)
  })

  describe('current route is `/Onboarding/Agree`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                index: 0,
                routeName: 'Onboarding',
                routes: [
                  {
                    routeName: 'Agree'
                  }
                ]
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

      it('should navigate to `RequestCode`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'RequestCode'
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

  describe('current route is `/Onboarding/RequestCode`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                index: 0,
                routeName: 'Onboarding',
                routes: [
                  {
                    routeName: 'RequestCode'
                  }
                ]
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

      it('should navigate to `SubmitCode`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'SubmitCode'
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

  describe('current route is `/Onboarding/SubmitCode`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                index: 0,
                routeName: 'Onboarding',
                routes: [
                  {
                    routeName: 'SubmitCode'
                  }
                ]
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

      it('should navigate to `Initialize`', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenLastCalledWith({
          routeName: 'Initialize'
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

  describe('current route is `/Onboarding/Initialize`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                index: 0,
                routeName: 'Onboarding',
                routes: [
                  {
                    routeName: 'Initialize'
                  }
                ]
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

      it('should navigate to `ProfileInfo` screen', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'ProfileInfo'
        })
      })
    })
  })

  describe('current route is `/Onboarding/ProfileInfo`', () => {
    beforeEach(() => {
      setTopLevelNavigator({
        dispatch: jest.fn(),
        state: {
          nav: {
            index: 0,
            routes: [
              {
                index: 0,
                routeName: 'Onboarding',
                routes: [
                  {
                    routeName: 'ProfileInfo'
                  }
                ]
              }
            ]
          }
        }
      })
    })

    describe('user has not saved username', () => {
      let action
      beforeEach(() => {
        store.getState = jest.fn(() => ({
          profile: {
            info: {
              isSaving: true,
              isSaved: false
            }
          }
        }))
        action = {
          type: 'PERSISTENCE:SAVE_STATE_SUCCESS',
          payload: {}
        }
        callMiddleware = navigationMiddleware(navigationActions)(store)(next)
      })

      it('should not navigate away', () => {
        const returnedAction = callMiddleware(action)

        expect(navigationActions.navigate).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
        expect(returnedAction).toEqual(action)
      })
    })

    describe('user has successfully saved username', () => {
      let action
      beforeEach(() => {
        store.getState = jest.fn(() => ({
          profile: {
            userName: 'Nobita'
          }
        }))
        action = {
          type: 'SAVE_USER_NAME',
          payload: {
            userName: 'someusername'
          }
        }
        callMiddleware = navigationMiddleware(navigationActions)(store)(next)
      })

      it('should navigate to `Conversation` screen', () => {
        callMiddleware(action)

        expect(navigationActions.navigate).toHaveBeenCalledWith({
          routeName: 'Conversation'
        })
      })
    })
  })
})
