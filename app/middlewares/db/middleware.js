import { GROUP_DELIVER_REQUEST, MESSAGING_DELIVER_REQUEST } from 'hg/actions'
import { messagingDeliverSuccess } from 'hg/actions/messaging'
import { createContact, createMessage, createMessageGroup } from 'hg/db'

export default (store) => (next) => (action) => {
  const nextAction = next(action)

  if (action.type === GROUP_DELIVER_REQUEST) {
    const dateCreated = action.payload.date_created
    const groupId = action.payload.group_id
    const groupName = action.payload.group_name
    const memberSids = action.payload.member_sids

    memberSids.forEach((sid) => {
      createContact(sid)
    })

    createMessageGroup(groupId, groupName, dateCreated, memberSids)
    return nextAction
  }

  if (action.type === MESSAGING_DELIVER_REQUEST) {
    const id = action.payload.message_id
    const content = action.payload.content
    const dateCreated = action.payload.date_created
    const messageGroupId = action.payload.group_id
    const senderSid = action.payload.sender_sid
    createMessage(id, content, dateCreated, messageGroupId, senderSid)
      .then(() => {
        store.dispatch(messagingDeliverSuccess(id))
      })
    return nextAction
  }

  return nextAction
}
