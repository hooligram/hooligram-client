import { connect } from 'react-redux'
import {
  goToGroupLeave,
  goToGroupMemberAdd,
  goToHome
} from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupLeave: () => {
      dispatch(goToGroupLeave())
    },

    goToGroupMemberAdd: () => {
      dispatch(goToGroupMemberAdd())
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
