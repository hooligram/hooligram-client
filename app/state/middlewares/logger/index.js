export default store => next => action => {
  console.log('prevState', store.getState())
  console.log('action', action)
  const nextAction = next(action)
  console.log('nextState', store.getState())
  return nextAction
}
