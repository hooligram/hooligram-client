import { connect } from 'react-redux'
import {
  goToGroupLeave,
  goToGroupMemberAdd,
  goToHome,
  messagingSendRequest
} from 'hg/actions'
import { currentUserSid } from 'hg/selectors'
import { getCurrentTimestamp } from 'hg/utils'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupLeave: (groupId) => {
      dispatch(goToGroupLeave(groupId))
    },

    goToGroupMemberAdd: (groupId) => {
      dispatch(goToGroupMemberAdd(groupId))
    },

    goToHome: () => {
      dispatch(goToHome())
    },

    messagingSendRequest: (groupId, content) => {
      const actionId = getCurrentTimestamp()
      dispatch(messagingSendRequest(actionId, groupId, content))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserSid: currentUserSid(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
