import { MESSAGING_DELIVER_SUCCESS, MESSAGING_SEND_REQUEST } from '.'

export const messagingDeliverSuccess = (actionId, messageId) => {
  return {
    id: actionId,
    payload: {
      message_id: messageId
    },
    type: MESSAGING_DELIVER_SUCCESS
  }
}

export const messagingSendRequest = (actionId, groupId, content) => {
  return {
    id: actionId,
    payload: {
      group_id: groupId,
      content
    },
    type: MESSAGING_SEND_REQUEST
  }
}
