import { connect } from 'react-redux'
import { groupCreateRequest } from 'hg/actions/group'
import { goToGroupMessage } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupMessage: () => {
      dispatch(goToGroupMessage())
    },

    groupCreateRequest: (groupName, memberSids) => {
      dispatch(groupCreateRequest(groupName, memberSids))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
