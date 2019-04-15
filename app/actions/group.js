import {
  GROUP_ADD_MEMBER_REQUEST,
  GROUP_CREATE_REQUEST,
  GROUP_LEAVE_REQUEST
} from '.'

export const groupAddMemberRequest = (actionId, groupId, memberSid) => {
  return {
    id: actionId,
    payload: {
      group_id: groupId,
      member_sid: memberSid
    },
    type: GROUP_ADD_MEMBER_REQUEST
  }
}

export const groupCreateRequest = (actionId, groupName, memberSids) => {
  return {
    id: actionId,
    payload: {
      group_name: groupName,
      member_sids: [...memberSids]
    },
    type: GROUP_CREATE_REQUEST
  }
}

export const groupLeaveRequest = (actionId, groupId) => {
  return {
    id: actionId,
    payload: {
      group_id: groupId
    },
    type: GROUP_LEAVE_REQUEST
  }
}
