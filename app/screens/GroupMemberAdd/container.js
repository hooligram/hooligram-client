import { connect } from 'react-redux'
import { groupAddMemberRequest } from 'hg/actions/group'
import { goToGroupMessage } from 'hg/actions/navigation'
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
