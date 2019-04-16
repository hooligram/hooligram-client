import { actions } from 'hg/constants'

export const messagingDeliverSuccess = (actionId, messageId) => {
  return {
    id: actionId,
    payload: {
      message_id: messageId
    },
    type: actions.MESSAGING_DELIVER_SUCCESS
  }
}

export const messagingSendRequest = (actionId, groupId, content) => {
  return {
    id: actionId,
    payload: {
      group_id: groupId,
      content
    },
    type: actions.MESSAGING_SEND_REQUEST
  }
}
