import { GROUP_DELIVER_REQUEST } from 'hg/actions'

export default (store) => (next) => (action) => {
  const nextAction = next(action)

  if (action.type === GROUP_DELIVER_REQUEST) {
    return nextAction
  }

  return nextAction
}
