import { connect } from 'react-redux'
import { goToGroupMessage } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupMessage: (groupId) => {
      dispatch(goToGroupMessage(groupId))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
