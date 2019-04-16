import { connect } from 'react-redux'
import { goToContactEdit, groupLeaveRequest, messagingSendRequest } from 'hg/actions'
import { currentUserSid } from 'hg/selectors'
import { getCurrentTimestamp } from 'hg/utils'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContactEdit: (contactSid) => {
      dispatch(goToContactEdit(contactSid, true))
    },

    groupLeaveRequest: (groupId) => {
      dispatch(groupLeaveRequest(getCurrentTimestamp(), groupId))
    },

    messagingSendRequest: (groupId, content) => {
      dispatch(messagingSendRequest(getCurrentTimestamp(), groupId, content))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserSid: currentUserSid(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
