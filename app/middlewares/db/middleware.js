import { messagingDeliverSuccess } from 'hg/actions'
import { actions, groupTypes } from 'hg/constants'
import {
  createContact,
  createDirectMessage,
  createMessage,
  createMessageGroup
} from 'hg/db'
import { currentUserSid } from 'hg/selectors'
import { getCurrentTimestamp } from 'hg/utils'

export default (store) => (next) => (action) => {
  const nextAction = next(action)

  if (action.type === actions.GROUP_DELIVER_REQUEST) {
    const dateCreated = action.payload.date_created
    const groupId = action.payload.group_id
    const groupName = action.payload.group_name
    const groupType = action.payload.group_type
    const memberSids = action.payload.member_sids

    memberSids.forEach((sid) => {
      createContact(sid)
    })

    createMessageGroup(groupId, groupName, dateCreated, memberSids)

    if (groupType === groupTypes.DIRECT_MESSAGE) {
      const userSid = currentUserSid(store.getState())

      const recipientSid = memberSids.reduce((result, sid) => {
        if (sid == userSid) return result

        return sid
      }, '')

      createDirectMessage(groupId, recipientSid)
    }

    return nextAction
  }

  if (action.type === actions.MESSAGING_DELIVER_REQUEST) {
    const id = action.payload.message_id
    const content = action.payload.content
    const dateCreated = action.payload.date_created
    const messageGroupId = action.payload.group_id
    const senderSid = action.payload.sender_sid
    createMessage(id, content, dateCreated, messageGroupId, senderSid)
      .then(() => {
        const actionId = getCurrentTimestamp()
        store.dispatch(messagingDeliverSuccess(actionId, id))
      })
    return nextAction
  }

  return nextAction
}
