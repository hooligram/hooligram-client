import { GROUP_CREATE_REQUEST } from '.'

export const groupCreateRequest = (groupName, memberSids) => {
  return {
    payload: {
      group_name: groupName,
      member_sids: [...memberSids]
    },
    type: GROUP_CREATE_REQUEST
  }
}
