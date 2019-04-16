import { connect } from 'react-redux'
import { goToOnboardingRequest } from 'hg/actions'
import component from './component'

const mapDispatchToProps = dispatch => {
  return {
    goToOnboardingRequest: () => {
      dispatch(goToOnboardingRequest())
    }
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(component)
