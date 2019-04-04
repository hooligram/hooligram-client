import { connect } from 'react-redux'
import { goToHome } from 'hg/actions/navigation'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      const timeout = 1000
      setTimeout(() => {
        dispatch(goToHome())
      }, timeout)
    }
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
