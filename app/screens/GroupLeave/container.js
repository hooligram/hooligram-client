import { connect } from 'react-redux'
import { groupLeaveRequest } from 'hg/actions/group'
import { goToHome } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    groupLeaveRequest: (actionId, groupId) => {
      dispatch(groupLeaveRequest(actionId, groupId))
    },

    goToHome: () => {
      dispatch(goToHome())
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
