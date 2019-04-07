import { MESSAGING_SEND_REQUEST } from '.'

export const messagingSendRequest = (actionId, groupId, content) => {
  return {
    payload: {
      action_id: actionId,
      group_id: groupId,
      content
    },
    type: MESSAGING_SEND_REQUEST
  }
}
