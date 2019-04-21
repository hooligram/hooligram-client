import { actions } from 'hg/constants'

export const goToContact = () => {
  return {
    payload: {},
    type: actions.GO_TO_CONTACT
  }
}

export const goToContactCreate = () => {
  return {
    payload: {},
    type: actions.GO_TO_CONTACT_CREATE
  }
}

export const goToContactEdit = (contactSid, shouldGoBack = false) => {
  return {
    payload: {
      contact_sid: contactSid,
      should_go_back: shouldGoBack
    },
    type: actions.GO_TO_CONTACT_EDIT
  }
}

export const goToDirectMessage = (groupId) => {
  return {
    payload: {
      group_id: groupId
    },
    type: actions.GO_TO_DIRECT_MESSAGE
  }
}

export const goToGroupCreate = () => {
  return {
    payload: {},
    type: actions.GO_TO_GROUP_CREATE
  }
}

export const goToGroupLeave = (groupId) => {
  return {
    payload: {
      group_id: groupId
    },
    type: actions.GO_TO_GROUP_LEAVE
  }
}

export const goToGroupMemberAdd = (groupId) => {
  return {
    payload: {
      group_id: groupId
    },
    type: actions.GO_TO_GROUP_MEMBER_ADD
  }
}

export const goToGroupMessage = (groupId) => {
  return {
    payload: {
      group_id: groupId
    },
    type: actions.GO_TO_GROUP_MESSAGE
  }
}

export const goToHome = () => {
  return {
    payload: {},
    type: actions.GO_TO_HOME
  }
}

export const goToOnboardingAgree = () => {
  return {
    payload: {},
    type: actions.GO_TO_ONBOARDING_AGREE
  }
}

export const goToOnboardingInitialize = () => {
  return {
    payload: {},
    type: actions.GO_TO_ONBOARDING_INITIALIZE
  }
}

export const goToOnboardingRequest = () => {
  return {
    payload: {},
    type: actions.GO_TO_ONBOARDING_REQUEST
  }
}

export const goToOnboardingSubmit = () => {
  return {
    payload: {},
    type: actions.GO_TO_ONBOARDING_SUBMIT
  }
}

export const goToSplash = () => {
  return {
    payload: {},
    type: actions.GO_TO_SPLASH
  }
}
