import {
  GO_TO_CONTACT,
  GO_TO_CONTACT_CREATE,
  GO_TO_GROUP_CREATE,
  GO_TO_GROUP_INFO,
  GO_TO_GROUP_LEAVE,
  GO_TO_GROUP_MEMBER_ADD,
  GO_TO_GROUP_MESSAGE,
  GO_TO_HOME,
  GO_TO_ONBOARDING_AGREE,
  GO_TO_ONBOARDING_INITIALIZE,
  GO_TO_ONBOARDING_REQUEST,
  GO_TO_ONBOARDING_SUBMIT,
  GO_TO_SPLASH
} from '.'

export const goToContact = () => {
  return {
    payload: {},
    type: GO_TO_CONTACT
  }
}

export const goToContactCreate = () => {
  return {
    payload: {},
    type: GO_TO_CONTACT_CREATE
  }
}

export const goToGroupCreate = () => {
  return {
    payload: {},
    type: GO_TO_GROUP_CREATE
  }
}

export const goToGroupInfo = (memberSids = []) => {
  return {
    payload: {
      member_sids: memberSids
    },
    type: GO_TO_GROUP_INFO
  }
}

export const goToGroupLeave = () => {
  return {
    payload: {},
    type: GO_TO_GROUP_LEAVE
  }
}

export const goToGroupMemberAdd = () => {
  return {
    payload: {},
    type: GO_TO_GROUP_MEMBER_ADD
  }
}

export const goToGroupMessage = () => {
  return {
    payload: {},
    type: GO_TO_GROUP_MESSAGE
  }
}

export const goToHome = () => {
  return {
    payload: {},
    type: GO_TO_HOME
  }
}

export const goToOnboardingAgree = () => {
  return {
    payload: {},
    type: GO_TO_ONBOARDING_AGREE
  }
}

export const goToOnboardingInitialize = () => {
  return {
    payload: {},
    type: GO_TO_ONBOARDING_INITIALIZE
  }
}

export const goToOnboardingRequest = () => {
  return {
    payload: {},
    type: GO_TO_ONBOARDING_REQUEST
  }
}

export const goToOnboardingSubmit = () => {
  return {
    payload: {},
    type: GO_TO_ONBOARDING_SUBMIT
  }
}

export const goToSplash = () => {
  return {
    payload: {},
    type: GO_TO_SPLASH
  }
}
