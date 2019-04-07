import { connect } from 'react-redux'
import { signOut } from 'hg/actions/app'
import { goToContact, goToGroupMessage } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContact: () => {
      dispatch(goToContact())
    },

    goToGroupMessage: (groupId) => {
      dispatch(goToGroupMessage(groupId))
    },

    signOut: () => {
      dispatch(signOut())
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
