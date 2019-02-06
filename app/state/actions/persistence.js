export const STORAGE_LOAD_STATE = 'STORAGE:LOAD_STATE'

export const loadState = (state) => {
  return {
    type: STORAGE_LOAD_STATE,
    payload: {
      state
    }
  }
}
