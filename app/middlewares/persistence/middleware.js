import { asyncStorage } from 'hg/persistence'
import { app } from 'hg/constants'

export default store => next => action => {
  const nextAction = next(action)
  const state = store.getState()

  asyncStorage.saveObject(app.STORE_STORAGE_KEY, state)

  return nextAction
}
