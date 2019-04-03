import { connect as _connect } from 'react-redux'
import { ONBOARDING_INITIALIZE_SUCCESS } from 'hg/actions'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      const randomTimeout = 1000
      setTimeout(() => {
        dispatch({
          type: ONBOARDING_INITIALIZE_SUCCESS,
          payload: {}
        })
      }, randomTimeout)
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
