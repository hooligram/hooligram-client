import { connect } from 'react-redux'
import { ONBOARDING_INITIALIZE_SUCCESS } from 'hg/actions'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      const timeout = 1000
      setTimeout(() => {
        dispatch({
          type: ONBOARDING_INITIALIZE_SUCCESS,
          payload: {}
        })
      }, timeout)
    }
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
