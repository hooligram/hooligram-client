import { GROUP_CREATE_REQUEST } from '.'

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
