import { loadState } from '@state/actions/persistence'
import { INIT } from '@state/actions/app'

const persistence = persistenceApi => store => next => async action => {
  if (action.type === INIT) {
    let nextState
    try {
      nextState = await persistenceApi.getState()
    }
    catch (error) {
      store.dispatch({
        type: 'STORAGE:LOAD_STATE_FAILURE',
        payload: {
          error
        }
      })
    }

    if (nextState !== undefined && nextState !== null) {
      store.dispatch(loadState(nextState))
    }
    return next(action)
  }

  try {
    const state = store.getState()
    await persistenceApi.saveState(state)
  }
  catch (error) {
    store.dispatch({
      type: 'STORAGE:SAVE_STATE_FAILURE',
      payload: {
        error
      }
    })
  }

  return next(action)
}

export default persistence
