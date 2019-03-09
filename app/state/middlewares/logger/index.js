let actionCount = 0
const actionTypeCount = new Map()

export default store => next => action => {
  if (__DEV__) {
    const actionType = action.type
    actionCount += 1

    if (!actionTypeCount.has(actionType)) {
      actionTypeCount.set(actionType, 0)
    }

    actionTypeCount.set(actionType, actionTypeCount.get(actionType) + 1)
    console.log(`__ACTION__ (${actionCount}) ${actionType} [${actionTypeCount.get(actionType)}]`)
  }

  return next(action)
}
