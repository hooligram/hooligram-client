import { GROUP_DELIVER_REQUEST } from 'hg/actions'
import { createContact, createMessageGroup } from 'hg/db'

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

  return nextAction
}
