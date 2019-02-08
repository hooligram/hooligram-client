import {
  loadStateRequest,
  loadStateSuccess,
  loadStateFailure,
  saveStateRequest,
  saveStateSuccess,
  saveStateFailure
} from '@state/actions/persistence'
import { INIT } from '@state/actions/app'

const persistence = persistenceApi => store => next => async action => {
  const { getState, dispatch } = store

  if (action.type === INIT) {
    let nextState

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

    return next(action)
  }

  if (action.type.startsWith('PERSISTENCE:')) {
    return next(action)
  }

  try {
    const nextState = getState()
    dispatch(saveStateRequest(nextState))
    await persistenceApi.saveState(nextState)
    dispatch(saveStateSuccess())
  }
  catch (error) {
    dispatch(saveStateFailure(error))
  }

  return next(action)
}

export default persistence
