import { connect } from 'react-redux'
import { goToContactCreate, goToGroupCreate } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContactCreate: () => {
      dispatch(goToContactCreate())
    },

    goToGroupCreate: () => {
      dispatch(goToGroupCreate())
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
