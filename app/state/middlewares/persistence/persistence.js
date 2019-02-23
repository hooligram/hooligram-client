import {
  API_AUTHORIZATION_SIGN_IN_SUCCESS,
  MESSAGING_BROADCAST_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  VERIFICATION_SUBMIT_CODE_SUCCESS
} from '@state/actions'
import {
  loadStateRequest,
  loadStateSuccess,
  loadStateFailure,
  saveStateRequest,
  saveStateSuccess,
  saveStateFailure
} from '@state/actions/persistence'
import { APP_STARTUP } from '@state/actions'

const persistence = persistenceApi => store => next => async action => {
  const { getState, dispatch } = store

  if (action.type === APP_STARTUP) {
    let nextState
    const returnedAction = next(action)

    try {
      dispatch(loadStateRequest())
      nextState = await persistenceApi.getState()

      if (nextState !== undefined && nextState !== null) {
        dispatch(loadStateSuccess(nextState))
      }
      else {
        dispatch(loadStateFailure(
          new Error('Error: state in storage is `undefined` or `null`')
        ))
      }
    }
    catch (error) {
      dispatch(loadStateFailure(error))
    }

    return returnedAction
  }

  if (![
    API_AUTHORIZATION_SIGN_IN_SUCCESS,
    MESSAGING_BROADCAST_SUCCESS,
    VERIFICATION_REQUEST_CODE_SUCCESS,
    VERIFICATION_SUBMIT_CODE_SUCCESS
  ].includes(action.type)) {
    return next(action)
  }

  const prevState = getState()
  const returnedAction = next(action)
  const nextState = getState()

  if (!nextState.app.isStartupDone) {
    return returnedAction
  }

  try {
    dispatch(saveStateRequest(nextState))
    await persistenceApi.saveState(nextState)
    dispatch(saveStateSuccess())
  }
  catch (error) {
    dispatch(saveStateFailure(error))
  }

  return returnedAction
}

export default persistence
