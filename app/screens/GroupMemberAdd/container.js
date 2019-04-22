import { connect } from 'react-redux'
import { goToGroupMessage, groupAddMemberRequest } from 'hg/actions'
import { currentUserSid } from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupMessage: (groupId) => {
      dispatch(goToGroupMessage(groupId))
    },

    groupAddMemberRequest: (actionId, groupId, memberSid) => {
      dispatch(groupAddMemberRequest(actionId, groupId, memberSid))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserSid: currentUserSid(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
