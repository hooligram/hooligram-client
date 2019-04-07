import { GROUP_CREATE_REQUEST, GROUP_LEAVE_REQUEST } from '.'

export const groupCreateRequest = (actionId, groupName, memberSids) => {
  return {
    payload: {
      action_id: actionId,
      group_name: groupName,
      member_sids: [...memberSids]
    },
    type: GROUP_CREATE_REQUEST
  }
}

export const groupLeaveRequest = (groupId) => {
  return {
    payload: {
      group_id: groupId
    },
    type: GROUP_LEAVE_REQUEST
  }
}
