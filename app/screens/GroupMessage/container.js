import { connect } from 'react-redux'
import { messagingSendRequest } from 'hg/actions/messaging'
import {
  goToGroupLeave,
  goToGroupMemberAdd,
  goToHome
} from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupLeave: (groupId) => {
      dispatch(goToGroupLeave(groupId))
    },

    goToGroupMemberAdd: () => {
      dispatch(goToGroupMemberAdd())
    },

    goToHome: () => {
      dispatch(goToHome())
    },

    messagingSendRequest: (actionId, groupId, content) => {
      dispatch(messagingSendRequest(actionId, groupId, content))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
