import { connect } from 'react-redux'
import {
  goToContactCreate,
  goToDirectMessage,
  goToGroupCreate,
  groupCreateRequest
} from 'hg/actions'
import { currentUserSid } from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContactCreate: () => {
      dispatch(goToContactCreate())
    },

    goToDirectMessage: (groupId) => {
      dispatch(goToDirectMessage(groupId))
    },

    goToGroupCreate: () => {
      dispatch(goToGroupCreate())
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
