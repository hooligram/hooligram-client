import { connect } from 'react-redux'
import { goToGroupLeave, messagingSendRequest } from 'hg/actions'
import { currentUserSid } from 'hg/selectors'
import { getCurrentTimestamp } from 'hg/utils'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupLeave: (groupId) => {
      dispatch(goToGroupLeave(groupId))
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
