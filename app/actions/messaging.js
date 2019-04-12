import { MESSAGING_DELIVER_SUCCESS, MESSAGING_SEND_REQUEST } from '.'

export const messagingDeliverSuccess = (messageId) => {
  return {
    payload: {
      message_id: messageId
    },
    type: MESSAGING_DELIVER_SUCCESS
  }
}

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
