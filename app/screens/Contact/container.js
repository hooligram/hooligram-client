import { connect } from 'react-redux'
import { groupCreateRequest } from 'hg/actions/group'
import {
  goToContactCreate,
  goToDirectMessage,
  goToGroupCreate,
  goToGroupMessage
} from 'hg/actions/navigation'
import { currentUserSid } from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContactCreate: () => {
      dispatch(goToContactCreate())
    },

    goToGroupCreate: () => {
      dispatch(goToGroupCreate())
    },

    goToDirectMessage: (groupId) => {
      dispatch(goToDirectMessage(groupId))
    },

    goToGroupMessage: (groupId) => {
      dispatch(goToGroupMessage(groupId))
    },

    groupCreateRequest: (actionId, groupName, memberSids) => {
      dispatch(groupCreateRequest(actionId, groupName, memberSids))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserSid: currentUserSid(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
