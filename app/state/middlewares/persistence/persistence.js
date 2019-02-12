import {
  loadStateRequest,
  loadStateSuccess,
  loadStateFailure,
  saveStateRequest,
  saveStateSuccess,
  saveStateFailure
} from '@state/actions/persistence'
import { APP_STARTUP } from '@state/actions/app'

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

  if (action.type.startsWith('PERSISTENCE:')) {
    return next(action)
  }

  if (!action.type.match(/API:.*_SUCCESS/) && !action.type.match(/API:.*_FAILURE/)) {
    return next(action)
  }

  const prevState = getState()
  const returnedAction = next(action)
  const nextState = getState()

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
