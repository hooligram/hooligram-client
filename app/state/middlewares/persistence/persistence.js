import { loadState } from '@state/actions/persistence'
import { INIT } from '@state/actions/app'

const persistence = persistenceApi => store => next => async action => {
  if (action.type === INIT) {
    const nextState = await persistenceApi.getState()
    if (nextState !== undefined) {
      store.dispatch(loadState(nextState))
    }
  }
}

export default persistence
