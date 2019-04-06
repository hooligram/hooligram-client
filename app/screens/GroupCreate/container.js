import { connect } from 'react-redux'
import { goToGroupInfo } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToGroupInfo: (added) => {
      dispatch(goToGroupInfo(added))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
