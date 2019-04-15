import { connect } from 'react-redux'
import { goToHome, groupLeaveRequest } from 'hg/actions'
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
