import { connect } from 'react-redux'
import { goToHome } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToHome: () => {
      dispatch(goToHome())
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
